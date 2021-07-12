import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
