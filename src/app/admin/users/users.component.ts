import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  gusers: any;

  constructor(public ds: ServiceService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.ds.sendApiRequest("UserTable/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.gusers = data.payload
      console.log(this.gusers);
    })
  }

}
