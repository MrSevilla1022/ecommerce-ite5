import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import { Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private calendar: NgbCalendar, private authservice: SocialAuthService, private router: Router) { }

  model:any;
  today = this.calendar.getToday();

  ngOnInit(): void {
  }

  signinGoogle(){
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID).then((data:any) =>{
      localStorage.setItem('google_auth',JSON.stringify(data));
      this.router.navigateByUrl('/public/landingpage').then();
    })
  }
}
