import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../../services/service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
 category_id:any
 products:any[] = []
 category_title:any
  constructor(public ds: ServiceService,private router:Router) { }

  ngOnInit(): void {
    this.category_id = sessionStorage.getItem('category_id')
    console.log(this.category_id)
    this.checkCateg()
    this.getProducts()

  }

  checkCateg(){
    if(this.category_id == 1){
      this.category_title ="Helmets"
    }
    if(this.category_id == 2){
      this.category_title ="Headlights"
    }
  }

  getProducts(){
    this.ds.sendApiRequest2("products/", null,this.category_id ).subscribe((data: any) => {
      this.products = data.payload
    })
  }

}
