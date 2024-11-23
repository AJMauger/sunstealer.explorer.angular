import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthorizationComponent } from "./components/authorization.component";
import { FormComponent } from "./components/form.component";
import { GenericComponent } from "./components/generic.component";
import { GuardGuard } from "./guard.guard";
import { HomeComponent } from "./components/home.component";
import { MaterialComponent } from "./material/material.component";
import { TableComponent } from "./components/table.component";

const routes: Routes = [
  { path: "authorization", component: AuthorizationComponent, canActivate: [GuardGuard] },
  { path: "form", component: FormComponent },
  { path: "generic", component: GenericComponent },
  { path: "home", component: HomeComponent },
  { path: "material", component: MaterialComponent },
  { path: "oidc", component: HomeComponent },
  { path: "table", component: TableComponent },
  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
