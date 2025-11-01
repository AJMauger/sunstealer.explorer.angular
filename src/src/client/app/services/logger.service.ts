import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigurationService } from "./configuration.service"; 
import { Event, eSEVERITY } from "./event"; 
import { IdentityService } from "./identity.service";

import { Alert } from "./alert"

@Injectable({providedIn: 'root'})
export class LoggerService {
  public configuration!: ConfigurationService;
  public count: number = 0;
  public events: Event[] = new Array<Event>();
  public identity!: IdentityService;
  public notifications: Event[] = new Array<Event>();
  public severity = ["Db", "In", "Wn", "Er", "Ex"];

  // ajm: -----------------------------------------------------------------------------------------
  public constructor(private httpClient: HttpClient) {
    console.info("LogService.constructor()");
  }

  // ajm: -----------------------------------------------------------------------------------------
  public async Initialize(configuration: ConfigurationService, identity: IdentityService): Promise<any> {
    this.configuration = configuration;
    this.identity = identity;
    return Promise.resolve(true);
  }

  // ajm: -----------------------------------------------------------------------------------------
  public GetDateStringFile(date: Date): string {
    const D: string = String(date.getDate()).padStart(2, "0");
    const M: string = String(date.getMonth() + 1).padStart(2, "0");
    const h: string = String(date.getHours()).padStart(2, "0");
    const m: string = String(date.getMinutes()).padStart(2, "0");
    const s: string = String(date.getSeconds()).padStart(2, "0");

    return `${date.getFullYear()}-${M}-${D}T${h}-${m}-${s}`;
  }

  // ajm: -----------------------------------------------------------------------------------------
  public LogDebug(event: string, notification?: string): void {
    this.Log(eSEVERITY.eDEBUG, event, notification);
  }

  // ajm: -----------------------------------------------------------------------------------------
  public LogInformation(event: string, notification?: string): void {
    this.Log(eSEVERITY.eINFORMATION, event, notification);
  }

  // ajm: -----------------------------------------------------------------------------------------
  public LogWarning(event: string, notification?: string): void {
    if (notification === undefined) {
      notification = "Warning";
    }
    this.Log(eSEVERITY.eWARNING, event, notification);
  }

  // ajm: -----------------------------------------------------------------------------------------
  public LogError(event: string, notification?: string): void {
    if (notification === undefined) {
      notification = "Error";
    }
    this.Log(eSEVERITY.eERROR, event, notification);
  }

  // ajm: -----------------------------------------------------------------------------------------
  public LogException(e: Error, notification?: string): void {
    if (notification === undefined) {
      notification = "Exception";
    }
    const event: string = `${e.message}; ${e.name}; ${(e as any).error.error_description}; ${e.stack}`;
    this.Log(eSEVERITY.eEXCEPTION, event, notification);
  }

  // ajm: -----------------------------------------------------------------------------------------
  public async Log(severity: eSEVERITY, message: string, notification?: string): Promise<void> {
    try {
      const event: Event = new Event(severity, message, notification);

      if (notification) {
        if (this.notifications.length > 100) {
          this.notifications.shift();
        }
        this.notifications.push(event);
          new Alert(notification, severity);
      }

      if (severity >= this.configuration?.configuration.log.level /*|| eSEVERITY.eDEBUG*/) {
        if (this.events.length > this.configuration?.configuration.log.memory /*|| 200*/) {
          this.events.shift();
        }
        this.events.push(event);
      }

      if (this.identity?.accessToken) {
        const headers: any = {
          "Authorization": `Bearer ${this.identity?.accessToken}`
        };

        await new Promise<void>(() => this.httpClient.post(this.configuration.configuration.log.uri, event, { headers }).subscribe({
          next: (data: any) => {
          },
          error: (e: Error) => {
            console.warn(`httpClient.post(${this.configuration.configuration.log.uri} ${JSON.stringify(event)}`);
            console.error(e);
          }
        }));
      }
      console.log(event.ToString());
    } catch (e) {
      console.error(e);
    }
  }
}
