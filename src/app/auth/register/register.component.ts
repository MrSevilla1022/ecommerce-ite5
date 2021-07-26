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
  regCred :any = {}
  checked: boolean = false
  register(){
    if(this.checked){
      this.checkReg()
      // this.router.navigateByUrl('/public/landingpage').then();
    }else{
      alert("Please agree!")
    }
  }

  checkReg(){
    if(this.regCred.birthdate != null && this.regCred.fname != null && this.regCred.lname != null && this.regCred.phone_no && this.regCred.user_pword){


      this.regCred.birthdate = this.regCred.birthdate.toString()
      this.regCred.phone_no = this.regCred.phone_no.toString()
      if(this.regCred.phone_no[0] == "9" && this.regCred.phone_no.length == 10){
        if(this.regCred.user_pword.length >= 8){
          let isUser = false
          this.regCred.phone_no = '0' + this.regCred.phone_no
          this.ds.sendApiRequest('checkUser/',this.registerCred)
              .subscribe((result: any)=>{
                console.log('Check: '+result);
                this.users = result.payload
                for(let user of this.users){
                  if(user.phone_no == this.regCred.phone_no){
                    isUser = true
                    alert('Phone Number already used')
                    break;
                  }
                }
                if(isUser == false){
                  this.ds.sendApiRequest('register/',this.regCred).subscribe((result: any)=>{
                    let users = result.payload
                    console.log(result.payload)
                    for(let user of users){
                      if(user.phone_no == this.regCred.phone_no && user.user_pword == this.regCred.user_pword){
                        localStorage.setItem('user_id',JSON.stringify(user));

                        this.router.navigateByUrl('/public/landingpage').then();
                      }
                    }
                });
                }
            });
        }else{
          alert("Password too short")
        }

      }else{
        alert("Invalid Number!")
      }





    }else{
      alert("Please fill all the fields!")

    }

  }

  signinGoogle(){
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID).then((data:any) =>{
      localStorage.setItem('auth',JSON.stringify(data));
      this.registerNewUser();

    })
  }
  registerCred:any = {};
  userDetails:any
  users:any [] =[]


  check(){
    const storage  = localStorage.getItem('auth')
    if(storage){
      this.userDetails = JSON.parse(storage)
      console.log("User Details: ")
      console.log(this.userDetails)
    }else{

    }
    let isUser = false
    this.registerCred.email = this.userDetails.email
    this.ds.sendApiRequest('login/',this.registerCred)
    .subscribe((result: any)=>{
      console.log(result);
      this.users = result.payload


        })
      }

  registerNewUser(){
    const storage  = localStorage.getItem('auth')
    if(storage){
      this.userDetails = JSON.parse(storage)
      console.log("User Details: ")
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
          alert('Already registered')
          break;
        }
      }
      if(isUser == false){
        this.ds.sendApiRequest('registerGmail/',this.registerCred).subscribe((result: any)=>{
          let users = result.payload
          console.log(result.payload)
          for(let user of users){
            if(user.phone_no == this.registerCred.phone_no && user.user_pword == this.registerCred.user_pword){
              localStorage.setItem('user_id',JSON.stringify(user));

              this.router.navigateByUrl('/public/landingpage').then();
            }
          }
      });
      }
  });


  }
}
