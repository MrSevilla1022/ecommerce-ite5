import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(public ds: ServiceService,
    private router:Router,) { }

    wish:any
    user:any
  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
      console.log(this.user)
    }



    this.ds.sendApiRequest("wish/"+this.user.user_id, null ).subscribe((data: any) => {
      this.wish = data.payload
      console.log(this.wish)
    })
  }
  removeWish(id:any){
    this.ds.sendApiRequest("deleteWish/"+id, null ).subscribe((data: any) => {
     })
     let index = this.wish.findIndex((x:any) => x.wish_id ===id);
    this.wish.splice(index, 1);
  }

  cart:any = []
  checkCart:any =[]
  addCartBtn = "Add to Cart"
  disableBtn: boolean = false
  toCart:any = {}
  cartL:any
  addToCart(product:any){

    //get cart from db

    let cart = sessionStorage.getItem('cart')
    if(cart){
      this.cart = JSON.parse(cart)
      this.checkCart = JSON.parse(cart)
    }else{
    }
    let productid = product.product_id
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
      this.cart.push(product)

      console.log(product.product_id)
      this.toCart.product_id = productid
      this.toCart.user_id = this.user.user_id
      this.toCart.qty = 1
      this.cart.qty = 1
      console.log(this.toCart)
      let cartL = this.ds.resultList$
      this.cartL = Number(cartL)
      this.cartL++
      this.ds.resultList$ = this.cartL
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
      this.removeWish(product.wish_id)
    }



  }
}
