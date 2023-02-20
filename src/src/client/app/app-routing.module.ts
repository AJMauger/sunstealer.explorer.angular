import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { GenericComponent } from "./generic/generic.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "authorization", component: AuthorizationComponent },
  { path: "generic", component: GenericComponent },
  { path: "home", component: HomeComponent },
  { path: "oidc", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
