import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigurationService } from "./configuration.service";
import { DialogService } from "./dialog.service";
import { LoggerService } from "./logger.service";

import * as base64 from "base64-js";
import * as crypto from "crypto";
import * as jsonwebtoken from "jsonwebtoken";
import * as jwktopem from "jwk-to-pem";

export enum eOIDCFLOW {
  eSIGNEDOUT = "0",
  eSIGNINGIN = "1",
  eSIGNEDIN = "2",
}

@Injectable({
  providedIn: "root",
})
export class IdentityService {
  public configuration!: ConfigurationService;
  public dialog!: DialogService;
  public logger!: LoggerService;

  public accessToken: string | null = sessionStorage.getItem("accessToken");
  public code: string | null = sessionStorage.getItem("code");
  public codeVerifier: string | null = sessionStorage.getItem("codeVerifier");
  public discovery: any;
  public identityToken: string | null = sessionStorage.getItem("identityToken");
  public interval: NodeJS.Timeout | undefined = undefined;
  public redirect: string | null = null;
  public refreshToken: string | null = sessionStorage.getItem("refreshToken");
  public userInfo: any = JSON.parse(sessionStorage.getItem("userInfo") || "{}");

  public constructor(private httpClient: HttpClient) {
    console.info("IdentityService.constructor()");
  }

  public Initialize(configuration: ConfigurationService, dialog: DialogService, logger: LoggerService) {
    this.configuration = configuration;
    this.dialog = dialog;
    this.logger = logger;
    this.redirect = encodeURIComponent(`${document.location.origin}${this.configuration.configuration.ingress}/oidc`)

    this.logger.LogDebug(`identity: : code: ${this.code}`);
    this.logger.LogDebug(`identity: : code_verifier: ${this.codeVerifier}`);
    this.logger.LogDebug(`identity: : redirect: ${this.redirect}`);
  }

  // ajm: -----------------------------------------------------------------------------------------
  public AuthorizationCodeFlowPKCE = async (): Promise<void> => {
    if (!this.discovery) {
      await this.Start();
    }
    if (!this.discovery) {
      this.logger.LogError("!this.discovery");
      return;
    }
    if (!this.code) {
      if (!this.codeVerifier) {
        // ajm: offline_access => refresh tokens
        // ajm: openid => subject
        // ajm: profile => name
        // ajm: create code challemge/verifier
        const uri: string = `${this.discovery?.authorization_endpoint}?client_id=sunstealer_explorer&code_challenge=${this.CodeChallenge()}&code_challenge_method=S256&redirect_uri=${this.redirect}&response_type=code&scope=offline_access openid profile`;
        this.logger.LogDebug(`identity: AuthorizationCodeFlowPKCE() code request: ${uri}`);
        window.location.assign(uri);
      } else if (!this.accessToken) {
        this.logger.LogDebug(`identity: AuthorizationCodeFlowPKCE() code response: ${window.location.href}`);
        const url: URL = new URL(window.location.href);
        this.code = url.searchParams.get("code");
        if (this.code) {
          await this.GetToken();  // ajm: exchange code for tokens
          this.SetState(eOIDCFLOW.eSIGNEDIN);
        } else {
          this.logger.LogError(`identity: AuthorizationCodeFlowPKCE() code: ${this.code}`);
          sessionStorage.removeItem(`codeVerifier`);
          this.SetState(eOIDCFLOW.eSIGNEDOUT);
          this.codeVerifier=null;
        }
      }
    }
  }

  // ajm: -----------------------------------------------------------------------------------------
  public CodeChallenge = (): string | undefined => {
    try {
      const randomBytes: Buffer = crypto.randomBytes(128);
      const charset: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const buffer: Array<string> = [];
      for (let i: number = 0; i < randomBytes.byteLength; i++) {
        buffer.push(charset[randomBytes[i] % charset.length]);
      }
      this.codeVerifier = buffer.join("");
      sessionStorage.setItem(`codeVerifier`, this.codeVerifier);
      const hash: Buffer = crypto.createHash("sha256").update(this.codeVerifier).digest();
      const codeChallenge: string = base64.fromByteArray(new Uint8Array(hash.buffer)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
      return codeChallenge;
    } catch (e) {
      this.logger.LogException(e as any);
    }
    return undefined;
  }

  // ajm: -----------------------------------------------------------------------------------------
  public GetToken = async (): Promise<void> => {
    try {
      let data: string = "";
      if (this.refreshToken) {
        this.logger.LogDebug("identity: GetToken() grant_type: refresh_token");
        data = `client_id=sunstealer_explorer&code_verifier=${this.codeVerifier}&grant_type=refresh_token&redirect_uri=${this.redirect}&refresh_token=${this.refreshToken}`;
      } else {
        this.logger.LogDebug("identity: GetToken() grant_type: authorization_code");
        data = `client_id=sunstealer_explorer&client_secret=client_secret&code=${this.code}&code_verifier=${this.codeVerifier}&grant_type=authorization_code&redirect_uri=${this.redirect}`;
      }
      this.logger.LogDebug(`identity: GetToken() uri: ${this.discovery?.token_endpoint} data: ${data}`);
     
      await this.httpClient.post(this.discovery?.token_endpoint, data, { headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded") }).subscribe({
        next: async (data: any) => {
          const reload: boolean = !this.accessToken;
          this.logger.LogInformation(`identity: GetToken() status: tokens: ${JSON.stringify(data)}`);
          this.accessToken = data.access_token;
          sessionStorage.setItem(`accessToken`, this.accessToken || "");
          this.identityToken = data.id_token;
          sessionStorage.setItem(`identityToken`, this.identityToken || "");
          this.refreshToken = data.refresh_token;
          sessionStorage.setItem(`refreshToken`, this.refreshToken || "");

          /* try {
            await new Promise<void>((resolve, reject) => this.httpClient.get(this.discovery.jwks_uri, { headers: new HttpHeaders().set("Authorization", `Bearer ${this.accessToken}`) }).subscribe({
              next: (data: any) => {
                this.logger.LogInformation(`identity: get jwks: data: ${JSON.stringify(data, null, 2)}`);
                const publicKey: string = jwktopem(data.keys[1]);
                this.logger.LogInformation(`identity: public key: ${publicKey}`);
                const token: jsonwebtoken.JwtPayload | string = jsonwebtoken.verify(this.accessToken || "", publicKey, { complete: true, algorithms: ["RS256"] });
                if (token) {
                  this.logger.LogInformation(`jsonwebtoken.verify(access token): ${JSON.stringify(token, null, 2)}`);
                } else {
                  this.logger.LogError(`Invalid access token`);
                }
              },
              error: (e: Error) => {
                this.logger.LogException(e);
              }    
            }));
          } catch (e) {
            this.logger.LogException(e as any);
          }*/

          if (this.accessToken?.length === 43) {
            if (reload) {
              this.logger.LogDebug(`identity: GetToken() uri: ${this.discovery.userinfo_endpoint} data: ${data}`);
              await new Promise<void>((resolve, reject) => this.httpClient.get(this.discovery.userinfo_endpoint, { headers: new HttpHeaders().set("Authorization", `Bearer ${this.accessToken}`) }).subscribe({
                next: (data: any) => {
                  this.logger.LogInformation(`identity: GetToken() status: userinfo: ${JSON.stringify(data)}`);
                  this.userInfo = data;
                },
                error: (e: Error) => {
                  this.logger.LogException(e);
                }
              }));
            }
          } else {
            this.userInfo = jsonwebtoken.decode(data.id_token || "", { complete: true });
          }
          sessionStorage.setItem(`userInfo`, JSON.stringify(this.userInfo) || "");
          if (reload) {
            await this.configuration.Read();
            // window.location.assign(`${window.location.origin}${this.configuration.configuration.ingress}`);
          }
        },
        error: (e: Error) => {
          this.logger.LogException(e);
        }
      });
    } catch (e) {
      this.logger.LogException(e as any);
    }
  }

  // ajm: -----------------------------------------------------------------------------------------
  public GetState = (): eOIDCFLOW => {
    return sessionStorage.getItem("state") as eOIDCFLOW || eOIDCFLOW.eSIGNEDOUT;
  }

  // ajm: -----------------------------------------------------------------------------------------
  public SetState = (oidcFlow: eOIDCFLOW): void => {
    sessionStorage.setItem("state", oidcFlow);
  }

  // ajm: -----------------------------------------------------------------------------------------
  public SignOut = async (): Promise<void> => {
    this.logger.LogInformation("identity: SignOut()");
    try {
      const data: any = `client_id=sunstealer_explorer&id_token_hint=${this.identityToken}`;
      this.logger.LogDebug(`identity: SignOut() uri: ${this.discovery?.end_session_endpoint} data: ${JSON.stringify(data)}`);
      let headers: HttpHeaders = new HttpHeaders()
        .set("Accept", "text/html")
        .append("Content-Type", "application/x-www-form-urlencoded");

      this.logger.LogDebug(`https.post(${this.discovery?.end_session_endpoint} data: ${JSON.stringify(data)}`);

      await new Promise<void>(() => this.httpClient.post(this.discovery?.end_session_endpoint, data, { headers, responseType: "text" }).subscribe({
        next: async (data: string) => {
          // ajm: this.dialog.Show(data, "Sign-Out Title");
          let i: number = data.indexOf(`action="`);
          if (i!==-1) {
            i+=8;
            let j: number=data.indexOf(`"`, i);
            if (j!==-1) {
              const action: string=data.substring(i, j);
              i=data.indexOf(`value="`);
              if (i!==-1) {
                i+=7;
                j=data.indexOf(`"`, i);
                const xsrf: string=data.substring(i, j);
                const form: string = `xsrf=${xsrf}&logout=yes`;
          
                headers = new HttpHeaders()
                  .append("Content-Type", "application/x-www-form-urlencoded");
                  
                  this.logger.LogDebug(`identity: SignOut() uri: ${action} data: ${form}`);
                  await new Promise<void>(() => this.httpClient.post(action, form, { headers }).subscribe({
                  next: (data: any) =>  {
                    this.logger.LogInformation("Sign out cpmplete.", "Sign out cpmplete.");
                  },
                  error: (e: Error) => {
                    this.logger.LogException(e);
                  }  
                }));
              }
            } 
          }
        },
        error: (e: Error) => {
          this.logger.LogException(e);
        }  
      }));

      this.Stop();
      sessionStorage.clear();
      this.accessToken = null;
      this.code = null;
      this.codeVerifier = null;
      this.identityToken = null;
      this.refreshToken = null;
      this.userInfo = null;
    } catch (e) {
      this.logger.LogException(e as any);
    }
  }

  // ajm: -----------------------------------------------------------------------------------------
  public Start = async (): Promise<any> => {
    try {
      const uri: string = `${this.configuration.configuration.identity.uri}/.well-known/openid-configuration`;
      this.logger.LogDebug(`identity: start() uri: ${uri}`);
      return new Promise<void>((resolve, reject) => this.httpClient.get(uri).subscribe({
        next: (data: any) => {
          this.discovery = data;
          this.logger.LogDebug(`identity: start() discovery: ${JSON.stringify(this.discovery)}`);

          // this.discovery.authorization_endpoint = `${this.configuration.configuration.identity.uri}/auth`;
          // this.discovery.end_session_endpoint = `${this.configuration.configuration.identity.uri}/session/end`;*/
          // this.discovery.issuer = `http://ajmfco37-01.ajm.net:9001`;
          //  this.discovery.jwks_uri = `${this.configuration.configuration.identity.uri}/sunstealer-identity/jwks`;
          // this.discovery.token_endpoint = `${this.configuration.configuration.identity.uri}/sunstealer-identity/token`;
          // this.discovery.userinfo_endpoint = `${this.configuration.configuration.identity.uri}/sunstealer-identity/me`;*/

          if (!this.interval) {
            this.logger.LogInformation(`identity: starting interval ${this.configuration.configuration.identity.interval_ms}ms`);
            this.interval = setInterval(() => {
              if (this.accessToken) {
                /* ajm: await*/ this.GetToken();
              }
            }, this.configuration.configuration.identity.interval_ms);
          }
          return resolve();
        },
        error: (e: Error) => {
          this.logger.LogException(e);
          return resolve();
        }
      }));
    } catch (e) {
      this.logger.LogException(e as any);
    }
  }

  // ajm: -----------------------------------------------------------------------------------------
  public Stop = (): void => {
    try {
      this.logger.LogInformation("identity: Stop(), stopping interval");
      clearInterval(this.interval);
    } catch (e) {
      this.logger.LogException(e as any);
    }
  }
}