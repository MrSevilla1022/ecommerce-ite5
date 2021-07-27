import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'
import { Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})


export class LandingpageComponent implements OnInit {
  active = 1;
  closeResult: string = '';
  @ViewChild('content') content: any ;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  products:any[] = []
  helmet:any[] = []
  headlight:any[] = []
  userDetails:any;
  user:any;
  // ngAfterViewInit() {
  //   this.openModal();
  // }
  openModal(){
    this.modalService.open(this.content, { centered: true });
  }

  constructor(public ds: ServiceService,private router:Router, config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
      console.log(this.user)
    }
    const storage = localStorage.getItem('google_auth')

    if(storage){
      this.userDetails = JSON.parse(storage)
      console.log(this.userDetails)
    }else{

    }
    this.ds.sendApiRequest("cart/"+this.user.user_id, null ).subscribe((data: any) => {
      sessionStorage.setItem('cart',JSON.stringify(data.payload))
      this.cart = data.payload
      this.checkCart = data.payload
    })
    this.getProducts();
  }
  cart:any = []
  checkCart:any =[]
  addCartBtn = "Add to Cart"
  disableBtn: boolean = false
  toCart:any = {}
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
        this.addCartBtn = "On cart"
        alert("Already on cart!")
      }
    }
    if(!alrdCart){

      this.cart.push(product)
      console.log(product.product_id)
      this.toCart.product_id = product.product_id
      this.toCart.user_id = this.user.user_id
      console.log(this.toCart)
      alert("Added to cart!")
      this.ds.sendApiRequest("addCart/", this.toCart)
          .subscribe((result: any)=>{
            console.log(result);
        });
      sessionStorage.setItem('cart',JSON.stringify(this.cart))
    }




    //Delete all cart where user_id = user_id
    //Insert new cart

  }

  open(content:any) {
    this.modalService.open(content);
  }


  signOut(){
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/auth/login').then()
  }

  seeMore(category_id:any){
    console.log(category_id)
    this.ds.category_id = category_id;
    sessionStorage.setItem('category_id', category_id);
    this.router.navigate(['/public/products']);
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
