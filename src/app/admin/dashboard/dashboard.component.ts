import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { ServiceService } from '../../services/service.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users:any [] = [];
  products:any [] = [];
  sales:any
  constructor(private router: Router,public ds: ServiceService) { }

  ngOnInit(): void {

    this.getUsers()
    this.getProducts()
    this.getSales()
  }

  getSales(){
    // SELECT SUM(sold) FROM `tbl_products`
    this.ds.sendApiRequest("sales/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.sales = data.payload
      for(let s of this.sales){
        this.sales = s.sales
      }
    })
  }

  getProducts(){
    this.ds.sendApiRequest("products/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.products = data.payload
    })
  }
  getUsers(){
    this.ds.sendApiRequest('user/',null)
      .subscribe((result: any)=>{

        this.users = result.payload
        console.log(this.users)
  })
  }
}
