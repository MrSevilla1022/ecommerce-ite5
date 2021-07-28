import { Component, OnInit,ViewChild,AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ServiceService } from '../../services/service.service'
import { Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None,
styles:[`
  .carousel-item
  {
    display:block;
    opacity:0;
    transition: opacity .8s;
  }
  .carousel-item.active
  {
    display:block;
    opacity:1;
    transition: opacity .8s;

  }
  .carousel-control-next-icon,
  .carousel-control-prev-icon {
     filter: invert(1);
  }
  .carousel .carousel-indicators li {background-color: black;}
  .carousel .carousel-indicators li.active {background-color:  #0275d8;}

`]
})


export class LandingpageComponent implements OnInit {
  active = 1;
  closeResult: string = '';
  @ViewChild('content') content: any ;
  //images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images = ['/assets/cimages/1.jpg', '/assets/cimages/2.jpg', '/assets/cimages/3.jpg', '/assets/cimages/4.jpg']
  products:any[] = []
  helmet:any[] = []
  headlight:any[] = []
  userDetails:any;
  user:any;
  


  //stars hereeee
  currentRate = 8;

  openModal(){
    this.modalService.open(this.content, { centered: true });
  }

  constructor(
    public ds: ServiceService,
    private router:Router,
    
    private modalService: NgbModal,
    config: NgbCarouselConfig
    ) { 
      config.interval = 10000;
      config.pauseOnHover =true;
      config.wrap = false;
      config.keyboard = false;
    }
  


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
