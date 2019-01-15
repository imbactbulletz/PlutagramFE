import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content_routes } from './shared/routes/content-layout.routes';

const routes: Routes = content_routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
