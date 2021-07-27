import { JumbotronComponent } from './landingpage/jumbotron/jumbotron.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminloginComponent } from './auth/adminlogin/adminlogin.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingpageComponent } from './public/landingpage/landingpage.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component'
import { CartComponent } from './public/cart/cart.component'
import { NavbarComponent } from './navigation-bar/navbar/navbar.component'
import { ProductsComponent } from './public/products/products.component'

import { TransactionsComponent } from './admin/transactions/transactions.component'
import { UsersComponent } from './admin/users/users.component'
import { ChangecredentialsComponent } from './user/changecredentials/changecredentials.component'
import { WishlistComponent } from './user/wishlist/wishlist.component'
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OrderstatusComponent } from './user/orderstatus/orderstatus.component';

const routes: Routes = [
  { path: '', redirectTo: 'public/landingpage', pathMatch: 'full'},
  { path:'auth/login', component: LoginComponent },
  { path:'auth/register', component: RegisterComponent },
  { path:'auth/adminlogin', component: AdminloginComponent },

//PUBLIC
  { path:'public/landingpage', component: LandingpageComponent },
  { path:'public/cart', component: CartComponent },
  { path:'public/products', component: ProductsComponent },
  { path:'public/products', component: ProductsComponent },


//ADMIN
  { path:'navigation-bar/navbar', component: NavbarComponent },
  { path:'landingpage/jumbotron', component: JumbotronComponent },
  { path:'admin/addproduct', component: AddproductComponent },
  { path:'admin/dashboard', component: DashboardComponent },
  // test route for transactions and users table
  { path:'admin/transactions', component: TransactionsComponent },
  { path:'admin/users', component: UsersComponent },

//USER
  { path:'user/changecredentials', component: ChangecredentialsComponent },
  { path:'user/wishlist', component: WishlistComponent },
  { path:'user/orderstatus', component: OrderstatusComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
