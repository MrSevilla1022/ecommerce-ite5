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
  helmet:any[] = []
  headlight:any[] = []
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
    this.ds.sendApiRequest("products/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.products = data.payload
      for(let prods of this.products){
        if(this.helmet.length < 4){
          if(prods.category_id == 1){
            this.helmet.push(prods)
          }
        }
        if(this.headlight.length < 4){
          if(prods.category_id == 2){
            this.headlight.push(prods)
          }
        }
      }
    })
  }

}
