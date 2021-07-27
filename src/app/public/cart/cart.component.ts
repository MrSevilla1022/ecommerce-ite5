import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public ds: ServiceService) { }

  cartItems:any = []
  cart:any = []
  user:any;
  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
      console.log(this.user)
    }

    this.ds.sendApiRequest("cart/"+this.user.user_id, null ).subscribe((data: any) => {
      sessionStorage.setItem('cart',JSON.stringify(data.payload))
    })

    this.cartItems = sessionStorage.getItem('cart')
    this.cart = JSON.parse(this.cartItems)
    // this.ds.getMsg().subscribe((product:any) =>{
    //   this.cartItems.push({
    //     product_name: product.product_name,
    //     product_img: product.product_img,
    //     price: product.price
    //   })
    //   console.log(product)
    // })
  }
  acart:any []= []
  async removeItem(cartId:any){
    console.log(cartId)
    this.ds.sendApiRequest("deleteCart/"+cartId, null ).subscribe((data: any) => {
     this.acart = data.payload
     sessionStorage.setItem('cart',JSON.stringify(this.acart))


    })
    this.cartItems = sessionStorage.getItem('cart')
    this.cart = JSON.parse(this.cartItems)
    let index = this.cart.findIndex((x:any) => x.cart_id ===cartId);
    this.cart.splice(index, 1);

  }


}
