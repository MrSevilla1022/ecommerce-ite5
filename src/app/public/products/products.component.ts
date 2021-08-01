import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

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
 allprod:any[] = []
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

  ratingOne = 1;
  ratingTwo = 2;
  ratingThree = 3;
  ratingFour = 4;
  ratingFive = 5;
  category:any = "All"
  radioCheck = false
  radioCheck2 = false
  radioCheck3 = false
  radioCheck4 = false
  radioCheck5 = false
  sortCateg(cat:any){
    if(cat == "helmet"){
      this.products = this.helmet
      this.category = "Helmet"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
    if(cat == "hl"){
      this.products = this.headlight
      this.category = "Headlight"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
    if(cat == "all"){
      this.products = this.allprod
      this.category = "All"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
  }
  sortBrand(brand:any){
    if(brand == "all"){
      this.products = this.allprod
      this.category = "All"
    }
    if(brand == "n1"){
      this.products = this.nitro
      this.category = "All"
    }
    if(brand == "evo"){
      this.products = this.evo
      this.category = "All"
    }
    if(brand == "sealight"){
      this.products = this.sealight
      this.category = "All"
    }
  }

  sortRate(rate:any){
    if(rate == 5){
      this.products = this.rate5
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
      this.category = "All"
    }
    if(rate == 4){
      this.products = this.rate4
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
      this.category = "All"
    }
    if(rate == 3){
      this.products = this.rate3
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
      this.category = "All"
    }
    if(rate == 2){
      this.products = this.rate2
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
      this.category = "All"
    }
    if(rate == 1){
      this.products = this.rate1
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
      this.category = "All"
    }
  }

  rate1:any[]=[]
  rate2:any[]=[]
  rate3:any[]=[]
  rate4:any[]=[]
  rate5:any[]=[]

  evo:any[] = []
  nitro:any[] = []
  sealight:any = []
  getProducts(){
    this.ds.sendApiRequest("products/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.products = data.payload
      this.allprod = data.payload
      for(let prods of this.products){
        //SORT CATEG
          if(prods.category_id == 1){
            this.helmet.push(prods)
          }

          if(prods.category_id == 2){
            this.headlight.push(prods)
          }

          //SORT BRAND
          if(prods.brand_id == 1){
            this.nitro.push(prods)
          }
          if(prods.brand_id == 2){
            this.evo.push(prods)
          }
          if(prods.brand_id == 3){
            this.sealight.push(prods)
          }

          if(prods.rating >= 1){
            this.rate1.push(prods)
          }
          if(prods.rating >= 2){
            this.rate2.push(prods)
          }
          if(prods.rating >= 3){
            this.rate3.push(prods)
          }
          if(prods.rating >= 4){
            this.rate4.push(prods)
          }
          if(prods.rating >= 5){
            this.rate5.push(prods)
          }

      }
    })
  }

}
