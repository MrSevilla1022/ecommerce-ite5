import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'



@Component({
  selector: 'app-changepw',
  templateUrl: './changepw.component.html',
  styleUrls: ['./changepw.component.scss']
})
export class ChangepwComponent implements OnInit {

  constructor(public ds: ServiceService) { }
  user:any
  currPw:any
  newPw:any
  confPw:any
  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
    }
  }
  pword:any = {}
  changePw(){
    if(this.currPw == null ||  this.newPw == null  || this.confPw== null ){
      alert("Fill");
    }else{
      if(this.user.user_pword == this.currPw){
        alert("Continue");
        if(this.newPw.length >= 8){
          if(this.newPw == this.confPw){
            alert("Success!");
            this.pword.user_pword = this.newPw
            this.ds.sendApiRequest2("updateUser/", this.pword, this.user.user_id).subscribe((data:any) => {
            });
          }else{
            alert("Password does not match");
          }
        }else{
          alert("Use 8 or more characters!");
        }
      }else{
        alert("Current Password doesn't match");
      }
    }
  }

}
