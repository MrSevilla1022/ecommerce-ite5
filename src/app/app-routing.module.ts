import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LandingpageComponent } from './public/landingpage/landingpage.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component'

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  { path:'auth/login', component: LoginComponent },

//PUBLIC
  { path:'public/landingpage', component: LandingpageComponent },

//ADMIN
  { path:'admin/addproduct', component: AddproductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
