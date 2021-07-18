import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingpageComponent } from './public/landingpage/landingpage.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component'
import { CartComponent } from './public/cart/cart.component'
import { NavbarComponent } from './navigation-bar/navbar/navbar.component'
import { ProductsComponent } from './public/products/products.component'

const routes: Routes = [
  { path: '', redirectTo: 'public/landingpage', pathMatch: 'full'},
  { path:'auth/login', component: LoginComponent },
  { path:'auth/register', component: RegisterComponent },

//PUBLIC
  { path:'public/landingpage', component: LandingpageComponent },
  { path:'public/cart', component: CartComponent },
  { path:'public/products', component: ProductsComponent },
  { path:'public/products', component: ProductsComponent },


//ADMIN
  { path:'navigation-bar/navbar', component: NavbarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
