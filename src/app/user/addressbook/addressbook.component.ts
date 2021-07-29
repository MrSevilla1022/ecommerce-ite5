import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'

@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.scss']
})
export class AddressbookComponent implements OnInit {

  constructor(public ds: ServiceService) { }
  user:any;
  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
    }

  }

  updateAddr(){
    if(this.user.house_no == '' || this.user.street == '' || this.user.cityMunicipality == '' || this.user.province == ''){
      alert("Fill")
    }else{

      this.ds.sendApiRequest2("updateUser/", this.user, this.user.user_id).subscribe((data:any) => {

      });
      this.ds.sendApiRequest('user/'+this.user.user_id,null)
      .subscribe((result: any)=>{
        this.user = result.payload
        for(let i of this.user){
          this.user = i
          localStorage.setItem('user_id',JSON.stringify(this.user));
          console.log(this.user)
        }
      })


      alert("Success")
    }

  }

}
