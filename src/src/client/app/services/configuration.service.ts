import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IdentityService } from "./identity.service";
import { LoggerService } from "./logger.service";

@Injectable({providedIn: 'root'})
export class ConfigurationService {
  public configuration: any = {
    configuration: {
      uri: "https://ajmfco42-01.ajm.net:31001/sunstealer-platform/configuration"
    },
    ingress: "/sunstealer-explorer-angular",
    identity: {
      client_id: "Adam",
      interval_ms: 3 * 60 * 1000,
      uri: "https://ajmfco42-01.ajm.net:31010"
    },
    log: {
      level: 0,
      memory: 200,
      uri: "https://ajmfco42-01.ajm.net:31001/sunstealer-platform/log"
    }
  };

  public record: { data: any, etag: string, id: string } | undefined = undefined;

  // ajm: -----------------------------------------------------------------------------------------
  public constructor(private httpClient: HttpClient, public identity: IdentityService, public logger: LoggerService) {
    console.info("ConfigurationService.constructor()");
  }

  public async Initialize(identity: IdentityService, logger: LoggerService): Promise<any> {
    this.identity = identity;
    this.logger = logger;
    return Promise.resolve(true);
  }

  // ajm: -----------------------------------------------------------------------------------------
  public async Read(): Promise<boolean> {
    try {
      if (this.identity?.accessToken) {
        const headers: HttpHeaders = new HttpHeaders().set("Authorization", `Bearer ${this.identity.accessToken}`);

        this.logger.LogDebug(`Configuration: Read() uri: ${this.configuration.configuration.uri}/application/sunstealer-explorer-angular`);
        this.logger.LogDebug(`Configuration: Read() headers: ${JSON.stringify(headers)}`);

        const b: boolean = await new Promise<boolean>((resolve, reject) => this.httpClient.get(`${this.configuration.configuration.uri}/application/sunstealer-explorer-angular`, { headers }).subscribe({
          next: (data: any) => {
            this.logger.LogDebug(`Configuration: Read() ${JSON.stringify(data)}`);
            this.record = data[0];
            this.configuration = data[0].data;
            return resolve(true);
          },
          error: (e: Error) => {
            this.logger.LogException(e);
            return resolve(false);
          }
        })).catch((e) => {
          this.logger.LogException(e);
          return false;
        });
      }
    } catch(e) {
      this.logger.LogException(e as Error);
    }
    return false;
  }

  // ajm: -----------------------------------------------------------------------------------------
  public async Save(): Promise<boolean> {
    try {
      if (this.identity?.accessToken) {
        const headers: HttpHeaders = new HttpHeaders()
          .set("Authorization", `Bearer ${this.identity.accessToken}`);

        if (this.record) {
          const data: any = {
            collection: "application", 
            id: "sunstealer-explorer-angular",
            data: this.configuration, 
            etag: this.record?.etag
          }

          this.logger.LogDebug(`Configuration: Save(${JSON.stringify(data)})`);

          return new Promise<boolean>((resolve, reject) => this.httpClient.put(this.configuration.configuration.uri, { collection: "application", id: "sunstealer-explorer-angular", 
            data: this.configuration, etag: this.record?.etag }, { headers }).subscribe({
            next: (data: any) => {
              this.logger.LogDebug(`https.post(this.configuration?.configuration.configuration.uri ${data}`);
              if (this.record) {
                this.record.etag = data.etag;
              }
              return resolve(true);
            },
            error: (e: Error) => {
              this.logger.LogException(e);
              return resolve(false);
            }  
          }));
        } else {
          return new Promise<boolean>((resolve, reject) => this.httpClient.post(this.configuration.configuration.uri, { collection: "application", id: "sunstealer-explorer-angular", 
            data: this.configuration }, { headers }).subscribe({
            next: (data: any) => {
              this.logger.LogDebug(`https.post(this.configuration?.configuration.configuration.uri data: ${JSON.stringify(data)}`);
              if (this.record) {
                this.record.etag = data.etag;
              }
              return resolve(true);
            },
            error: (e: Error) => {
              this.logger.LogException(e);
              return resolve(false);
            }  
          }));
        }
      }
      return true;
    } catch(e) {
      this.logger.LogException(e as Error);
    }
    return false;
  }
}
