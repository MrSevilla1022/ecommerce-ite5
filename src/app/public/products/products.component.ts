import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ServiceService } from '../../services/service.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
 category_id:any

 category_title:any
 searchkey:any
 minprices:any
 maxprices:any
 @ViewChild('content') content: any ;

  constructor(public ds: ServiceService,private modalService: NgbModal,private router:Router) { }
  cart:any = []
  checkCart:any =[]
  user:any
  toCart:any = {}
  cartL:any
  page:any = 1
  pageSize:any=10
  ngOnInit(): void {

    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
      console.log(this.user)
    }
    this.category_id = sessionStorage.getItem('category_id')
    console.log(this.category_id)
    this.checkCateg()
    this.getProducts()

    this.ds.sendApiRequest("cart/"+this.user.user_id, null ).subscribe((data: any) => {
      sessionStorage.setItem('cart',JSON.stringify(data.payload))
      this.cart = data.payload
      this.checkCart = data.payload
    })
  }

  search(){
    if(this.searchkey == ""){
      this.products = this.allprod
    }else{
      this.products = this.products.filter(res =>{
        return res.product_name.toLocaleLowerCase().match(this.searchkey.toLocaleLowerCase())
      })
    }
  }

  sortpricemin(){
    if(this.minprices == ""){
      this.products = this.allprod
    }else{
      this.products = this.products.filter(res =>{
        return res.price.toLocaleLowerCase().match(this.minprices.toLocaleLowerCase())
      })
    }
  }
  sortpricemax(){
    if(this.maxprices == ""){
      this.products = this.allprod
    }else{
      this.products = this.products.filter(res =>{
        return res.price.toLocaleLowerCase().match(this.maxprices.toLocaleLowerCase())
      })
    }
  }
  toWish:any = {}
  wish:any[]=[]
  addWish(product:any){

    let wish = sessionStorage.getItem('wish')
    if(wish){
      this.wish = JSON.parse(wish)
    }else{
    }
    console.log(this.wish)
    let alrdWish = false
    for(let item of this.wish){
      if(product.product_id == item.product_id){
        alrdWish = true
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Item already on wishlist!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
    if(!alrdWish){
      this.wish.push(product)
      this.toWish.product_id = product.product_id
      this.toWish.user_id = this.user.user_id
      this.ds.sendApiRequest("addWish/", this.toWish)
            .subscribe((result: any)=>{
              console.log(result);
          });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added to Wishlist!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    sessionStorage.setItem('wish',JSON.stringify(this.wish))


  }
  open(content:any) {
    this.modalService.open(content,{size: 'xl'});
  }
  openModal(){
    this.modalService.open(this.content, {size:'xl', centered: true });
  }
  addToCart(product:any){

    //get cart from db

    let cart = sessionStorage.getItem('cart')
    if(cart){
      this.checkCart = JSON.parse(cart)
    }else{
    }

    let alrdCart = false
    for(let item of this.checkCart){
      if(product.product_id == item.product_id){
        alrdCart = true
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Item already on cart!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
    if(!alrdCart){
      product.qty=1
      this.cart.push(product)

      console.log(product.product_id)
      this.toCart.product_id = product.product_id
      this.toCart.user_id = this.user.user_id
      this.toCart.qty = 1
      this.cart.qty = 1
      console.log(this.toCart)
      this.cartL++
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item added to cart!',
        showConfirmButton: false,
        timer: 1500
      })
      this.ds.sendApiRequest("addCart/", this.toCart)
          .subscribe((result: any)=>{
            console.log(result);
        });
      sessionStorage.setItem('cart',JSON.stringify(this.cart))
    }

  }


  // RATING
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

  products:any[] = []
  allprod:any[] = []
  helmet:any[] = []
  gloves:any[] = []
  headlight:any[] = []
  protection:any[] = []
  airfilter:any[] = []
  exhaust:any[] = []
  lightings:any[] = []
  brakes:any[] = []
  tires:any[] = []
  accessories:any[] = []
  boots:any[] = []
  pants:any[] = []

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
    if(cat == "gloves"){
      this.products = this.gloves
      this.category = "Gloves"
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
    if(cat == "protection"){
      this.products = this.protection
      this.category = "protection"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
    if(cat == "pants"){
      this.products = this.pants
      this.category = "pants"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
    if(cat == "boots"){
      this.products = this.boots
      this.category = "boots"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
    if(cat == "brakes"){
      this.products = this.brakes
      this.category = "brakes"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
    if(cat == "lightings"){
      this.products = this.lightings
      this.category = "lightings"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
    if(cat == "accesories"){
      this.products = this.accessories
      this.category = "accesories"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
    if(cat == "tires"){
      this.products = this.tires
      this.category = "tires"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
    if(cat == "exhaust"){
      this.products = this.exhaust
      this.category = "exhaust"
      this.radioCheck = false
      this.radioCheck2 = false
      this.radioCheck3 = false
      this.radioCheck4 = false
    }
    if(cat == "airfilter"){
      this.products = this.airfilter
      this.category = "airfilter"
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
    if(brand == "biltwell"){
      this.products = this.biltwell
      this.category = "All"
    }
    if(brand == "hjc"){
      this.products = this.HJC
      this.category = "All"
    }
    if(brand == "nexx"){
      this.products = this.nexx
      this.category = "All"
    }
    if(brand == "shark"){
      this.products = this.shark
      this.category = "All"
    }
    if(brand == "zeus"){
      this.products = this.zeus
      this.category = "All"
    }
    if(brand == "spidi"){
      this.products = this.spidi
      this.category = "All"
    }
    if(brand == "augi"){
      this.products = this.augi
      this.category = "All"
    }
    if(brand == "ixon"){
      this.products = this.ixon
      this.category = "All"
    }
    if(brand == "bikelift"){
      this.products = this.bikelift
      this.category = "All"
    }
    if(brand == "stopandgo"){
      this.products = this.stopandgo
      this.category = "All"
    }
    if(brand == "mitas"){
      this.products = this.mitas
      this.category = "All"
    }
    if(brand == "ebc"){
      this.products = this.ebc
      this.category = "All"
    }
    if(brand == "brembo"){
      this.products = this.brembo
      this.category = "All"
    }
    if(brand == "galfer"){
      this.products = this.galfer
      this.category = "All"
    }
    if(brand == "rekluse"){
      this.products = this.reluse
      this.category = "All"
    }
    if(brand == "pmachine"){
      this.products = this.performancemachine
      this.category = "All"
    }
    if(brand == "aness"){
      this.products = this.arlenness
      this.category = "All"
    }
    if(brand == "cwerkes"){
      this.products = this.competitionwerkes
      this.category = "All"
    }
    if(brand == "cyclevision"){
      this.products = this.cyclevisions
      this.category = "All"
    }
    if(brand == "baja"){
      this.products = this.bajadesigns
      this.category = "All"
    }
    if(brand == "bikemaster"){
      this.products = this.bikemaster
      this.category = "All"
    }
    if(brand == "motodemic"){
      this.products = this.motodemic
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
  biltwell:any = []
  shark:any = []
  HJC:any = []
  nexx:any = []
  zeus: any = []
  spidi: any = []

  augi:any = []
  ixon:any = []
  bikelift:any = []
  stopandgo: any = []
  mitas: any = []

  ebc:any = []
  brembo:any = []
  galfer:any = []
  reluse: any = []
  performancemachine: any = []

  arlenness:any = []
  competitionwerkes:any = []
  cyclevisions:any = []
  bajadesigns: any = []
  bikemaster: any = []
  motodemic: any = []
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

          if(prods.category_id == 3){
            this.gloves.push(prods)
          }
          if(prods.category_id == 4){
            this.pants.push(prods)
          }
          if(prods.category_id == 4){
            this.protection.push(prods)
          }
          if(prods.category_id == 5){
            this.boots.push(prods)
          }
          if(prods.category_id == 7){
            this.protection.push(prods)
          }
          if(prods.category_id == 8){
            this.accessories.push(prods)
          }
          if(prods.category_id == 9){
            this.tires.push(prods)
          }
          if(prods.category_id == 10){
            this.brakes.push(prods)
          }
          if(prods.category_id == 11){
            this.lightings.push(prods)
          }
          if(prods.category_id == 12){
            this.exhaust.push(prods)
          }
          if(prods.category_id == 13){
            this.airfilter.push(prods)
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
          if(prods.brand_id == 4){
            this.biltwell.push(prods)
          }
          if(prods.brand_id == 5){
            this.HJC.push(prods)
          }
          if(prods.brand_id == 6){
            this.nexx.push(prods)
          }
          if(prods.brand_id == 7){
            this.shark.push(prods)
          }
          if(prods.brand_id == 8){
            this.zeus.push(prods)
          }
          if(prods.brand_id == 9){
            this.spidi.push(prods)
          }
          if(prods.brand_id == 10){
            this.spidi.push(prods)
          }
          if(prods.brand_id ==11){
            this.spidi.push(prods)
          }
          if(prods.brand_id == 12){
            this.augi.push(prods)
          }
          if(prods.brand_id == 13){
            this.ixon.push(prods)
          }
          if(prods.brand_id == 14){
            this.bikelift.push(prods)
          }
          if(prods.brand_id == 15){
            this.stopandgo.push(prods)
          }
          if(prods.brand_id == 16){
            this.mitas.push(prods)
          }
          if(prods.brand_id == 17){
            this.ebc.push(prods)
          }
          if(prods.brand_id == 16){
            this.brembo.push(prods)
          }
          if(prods.brand_id == 17){
            this.galfer.push(prods)
          }
          if(prods.brand_id == 18){
            this.reluse.push(prods)
          }
          if(prods.brand_id == 19){
            this.performancemachine.push(prods)
          }
          if(prods.brand_id == 20){
            this.arlenness.push(prods)
          }
          if(prods.brand_id == 21){
            this.competitionwerkes.push(prods)
          }
          if(prods.brand_id == 22){
            this.cyclevisions.push(prods)
          }
          if(prods.brand_id == 23){
            this.bajadesigns.push(prods)
          }
          if(prods.brand_id == 24){
            this.bikemaster.push(prods)
          }
          if(prods.brand_id == 25){
            this.motodemic.push(prods)
          }

          //sort by rating

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
  // RATING

}
