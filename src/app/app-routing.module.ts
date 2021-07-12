import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LandingpageComponent } from './public/landingpage/landingpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  { path:'auth/login', component: LoginComponent },
  { path:'public/landingpage', component: LandingpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
