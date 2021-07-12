import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private ds: ServiceService) { }

  ngOnInit(): void {
    this.apitest()
  }

  apitest(){
    this.ds.sendApiRequest("user/", null).subscribe((data: any) => {
      console.log(data);
    })
  }

}
