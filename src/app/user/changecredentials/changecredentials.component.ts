import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'

@Component({
  selector: 'app-changecredentials',
  templateUrl: './changecredentials.component.html',
  styleUrls: ['./changecredentials.component.scss']
})
export class ChangecredentialsComponent implements OnInit {

  constructor(public ds: ServiceService) { }
  user:any;
  updCred:any = {}
  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
      console.log(this.user)
    }
  }

  saveCred(){
    if(this.user.user_uname == '' || this.user.fname == '' || this.user.lname == '' || this.user.email == '' || this.user.phone_no == ''){
      alert("FILL")
    }else{
      alert("GOOD")
      if(this.validateEmail(this.user.email)){

        alert("valid email")
        this.validatePhone()
      }else{
        alert("invalid email")
      }
    }

    if(this.emailValid && this.unameAvail && this.phoneValid){
      // update user
      this.ds.sendApiRequest2("updateUser/", this.user, this.user.user_id).subscribe((data:any) => {

      });
      console.log('update user');
      alert("Updated")
    }else{

    }


  }


  users:any

  phoneValid:boolean = false
  unameAvail:boolean =false
  validatePhone(){
    if(this.user.phone_no[0] == "0" && this.user.phone_no[1] == "9" && this.user.phone_no.length == 11){
      this.unameAvail = true
      this.phoneValid = true
        let isUser = false

        this.ds.sendApiRequest('checkUser/',this.user)
            .subscribe((result: any)=>{
              console.log(result.payload);
              this.users = result.payload
              for(let user of this.users){
                if(user.user_uname == this.user.user_uname && this.user.user_id != user.user_id){
                  this.unameAvail = false
                  console.log('Username not available')
                  break;
                }

              }
              for(let user of this.users){
                if(user.email == this.user.email && this.user.user_id != user.user_id){
                  this.emailValid = false
                  console.log('Email not available')
                  break;
                }

              }

              for(let user of this.users){
                console.log(user.phone_no)
                console.log(this.user.phone_no)
                if(user.phone_no == this.user.phone_no && this.user.user_id != user.user_id){
                  this.phoneValid = false
                  console.log('Phone Number already used')
                  break;
                }
              }
              console.log(this.emailValid + " " +this.unameAvail+ " "+ this.phoneValid)
          });
    }else{
      console.log("Phone number invalid")
    }
  }

  emailValid:boolean =true;
  validateEmail(email:any){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


}
