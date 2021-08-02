import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { ServiceService } from '../../services/service.service'

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {

  constructor(private router: Router,public ds: ServiceService) { }
  uname:any
  pword:any

  ngOnInit(): void {
  }
  login(){
    if(this.pword != null && this.uname != null){
      console.log(this.uname)
      this.ds.sendApiRequest('adminLog/'+this.uname,null)
      .subscribe((result: any)=>{
        let res = result.payload
        if(res.length == 0){
          alert("Username does not match any record!")
        }else{

          for(let r of res){
            if(r.admin_pword == this.pword){
              alert("Welcome admin!")
              this.router.navigateByUrl('/admin/dashboard').then();
            }else{
              alert('Wrong password')
            }
          }
        }
        console.log(result.payload)
  })
    }else{
      alert("fill")
    }
  }

}
