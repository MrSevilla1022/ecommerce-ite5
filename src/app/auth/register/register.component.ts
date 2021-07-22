import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import { Router} from '@angular/router'
import { ServiceService } from '../../services/service.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private calendar: NgbCalendar, private authservice: SocialAuthService, private router: Router,public ds: ServiceService) { }

  model:any;
  today = this.calendar.getToday();

  ngOnInit(): void {
  }

  signinGoogle(){
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID).then((data:any) =>{
      localStorage.setItem('google_auth',JSON.stringify(data));
      this.registerNewUser();
      this.router.navigateByUrl('/public/landingpage').then();
    })
  }
  registerCred:any = {};
  userDetails:any
  users:any [] =[]

  registerNewUser(){
    const storage  = localStorage.getItem('google_auth')
    if(storage){
      this.userDetails = JSON.parse(storage)
      console.log(this.userDetails)
    }else{

    }
    let isUser = false
    this.registerCred.email = this.userDetails.email
    this.ds.sendApiRequest('checkUser/',this.registerCred)
    .subscribe((result: any)=>{
      console.log('Check: '+result);
      this.users = result.payload
      for(let user of this.users){
        if(user.email == this.registerCred.email){
          isUser = true
          break;
        }
      }
      if(isUser == false){
        this.ds.sendApiRequest('registerGmail/',this.registerCred).subscribe((result: any)=>{
          console.log(result);
      });
      }
  });


  }
}
