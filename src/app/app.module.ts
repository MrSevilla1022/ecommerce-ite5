import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingpageComponent } from './public/landingpage/landingpage.component';
import { CartComponent } from './public/cart/cart.component';
import { OrderstatusComponent } from './user/orderstatus/orderstatus.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { ChangecredentialsComponent } from './user/changecredentials/changecredentials.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { NavbarComponent } from './navigation-bar/navbar/navbar.component';
import { ProductsComponent } from './public/products/products.component';
import { GoogleLoginProvider, SocialAuthService, SocialLoginModule } from 'angularx-social-login';
import { AdminNavComponent } from './navigation-bar/admin-nav/admin-nav.component';
import { AdminloginComponent } from './auth/adminlogin/adminlogin.component';
//transactions and users
import { TransactionsComponent } from './admin/transactions/transactions.component';
import { UsersComponent } from './admin/users/users.component';
import { JumbotronComponent } from './landingpage/jumbotron/jumbotron.component';
import { FooterComponent } from './navigation-bar/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingpageComponent,
    CartComponent,
    OrderstatusComponent,
    CheckoutComponent,
    ChangecredentialsComponent,
    DashboardComponent,
    AddproductComponent,
    NavbarComponent,
    ProductsComponent,
    AdminNavComponent,
    AdminloginComponent,
    TransactionsComponent,
    UsersComponent,
    JumbotronComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide:'SocialAuthServiceConfig',
      useValue:{
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '237531944564-68fc8c817nipe67bcvhk0s01tb1bnsp8.apps.googleusercontent.com'
            )
          }
        ]
      } as unknown as SocialAuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
