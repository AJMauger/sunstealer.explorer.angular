import { Injectable } from '@angular/core';
import { GlobalHeaderComponent } from "../components/global-header.component";

@Injectable({providedIn: 'root'})
export class DialogService {
  constructor() {}

  public Initialize(globalHeaderComponent: GlobalHeaderComponent) {
    this.globalHeaderComponent=globalHeaderComponent;
  }

  Show(content: string, title: string) {
    console.log(`DialogService.Show(content: ${content}, title: ${title})`);
    this.globalHeaderComponent.OpenDialog(content, title);
  }

  private globalHeaderComponent!: GlobalHeaderComponent;
}
