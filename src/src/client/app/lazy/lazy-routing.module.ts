import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyComponent } from './lazy.component';

const routes: Routes = [{ path: "lazy", component: LazyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
