import { ThisReceiver } from '@angular/compiler';
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
  total:any = 0
  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
      console.log(this.user)
    }

    this.ds.sendApiRequest("cart/"+this.user.user_id, null ).subscribe((data: any) => {
      sessionStorage.setItem('cart',JSON.stringify(data.payload))
      console.log(data.payload)
    })

    this.cartItems = sessionStorage.getItem('cart')
    this.cart = JSON.parse(this.cartItems)
    console.log(this.cart)
    this.computeTotal()
    // this.ds.getMsg().subscribe((product:any) =>{
    //   this.cartItems.push({
    //     product_name: product.product_name,
    //     product_img: product.product_img,
    //     price: product.price
    //   })
    //   console.log(product)
    // })
  }

  computeTotal(){
    for(let i in this.cart){
        this.total+=this.cart[i].qty*this.cart[i].price
    }
  }

  updateQty:any = {}

  async decrementqty(cart:any){
    this.total = 0
    if(cart.qty != 1){
      for(let i in this.cart){

        if(this.cart[i].cart_id === cart.cart_id){
          this.cart[i].qty--
          this.updateQty.qty=this.cart[i].qty
          this.updateQuantity(cart.cart_id)

          this.computeTotal()
          break;
        }
      }
    }

  }

  updateQuantity(cart_id:any){
    this.ds.sendApiRequest2("updateQty/", this.updateQty, cart_id).subscribe((data:any) => {

    });
  }

  async incrementqty(cart:any){
    this.total = 0
    for(let i in this.cart){

      if(this.cart[i].cart_id === cart.cart_id){
        this.cart[i].qty++
        this.updateQty.qty=this.cart[i].qty
        this.updateQuantity(cart.cart_id)

        this.computeTotal()
        break;
      }
    }


  }


  acart:any []= []
  async removeItem(cartId:any){
    console.log(cartId)
    this.total = 0
    this.ds.sendApiRequest("deleteCart/"+cartId, null ).subscribe((data: any) => {
     this.acart = data.payload
     sessionStorage.setItem('cart',JSON.stringify(this.acart))
    })
    this.cartItems = sessionStorage.getItem('cart')
    this.cart = JSON.parse(this.cartItems)
    this.ds.itemnum = this.cart.length
    let index = this.cart.findIndex((x:any) => x.cart_id ===cartId);
    this.cart.splice(index, 1);
    this.computeTotal()

  }
  

}
