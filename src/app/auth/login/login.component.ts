import { Component, OnInit } from '@angular/core';

import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import { Router} from '@angular/router'
import { ServiceService } from '../../services/service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authservice: SocialAuthService, private router: Router,public ds: ServiceService) { }

  ngOnInit(): void {
  }


  signinGoogle(){
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID).then((data:any) =>{
      localStorage.setItem('auth',JSON.stringify(data));
      this.check();
    })
    // Check if email already exists on db? to landing page, if not, to register
  }

  logCred:any ={}

  loginPhone(){
    let isUser = false
    this.ds.sendApiRequest('user/',null)
      .subscribe((result: any)=>{
        
        this.users = result.payload
        for(let user of this.users){
        if(user.phone_no == this.logCred.phone_no && user.user_pword == this.logCred.user_pword){
          localStorage.setItem('user_id',JSON.stringify(user));
          isUser = true
          this.router.navigateByUrl('/public/landingpage').then();
        }
      }
      if(isUser == false){
        alert("Try again")
      }
  })
    
  }


  users:any [] = [];
  googleLog: any
  googleCred:any = {};
  login(){
    const storage  = localStorage.getItem('auth')
    if(storage){
      this.googleLog = JSON.parse(storage)
    }else{

    }
      this.googleCred.email = this.googleLog.email
      this.ds.sendApiRequest('login/',this.googleCred)
      .subscribe((result: any)=>{
        this.users = result.payload
        for(let user of this.users){
        if(user.email == this.googleCred.email){
          localStorage.setItem('user_id',JSON.stringify(result.payload));
          this.router.navigateByUrl('/public/landingpage').then();
        }
      }
  })
}
  registerCred:any = {};
  userDetails:any

  check(){
    const storage  = localStorage.getItem('auth')
    if(storage){
      this.userDetails = JSON.parse(storage)
    }else{

    }
    let isUser = false
    this.registerCred.email = this.userDetails.email
    this.registerCred.fname = this.userDetails.firstName
    this.registerCred.lname = this.userDetails.Name
    this.ds.sendApiRequest('checkUser/',this.registerCred)
    .subscribe((result: any)=>{
      console.log('Check: '+result);
      this.users = result.payload
      for(let user of this.users){
        if(user.email == this.registerCred.email){
          isUser = true
          this.login()
          break;
        }
      }
      if(isUser == false){
        this.ds.sendApiRequest('registerGmail/',this.registerCred).subscribe((result: any)=>{
          this.userList = result.payload
          for(let user of this.userList){
            if(user.email == this.registerCred.email)
            localStorage.setItem('user_id',JSON.stringify(user));
            this.router.navigateByUrl('/public/landingpage').then();
          }

      });
      }
  });
  }
  userList:any;

}
