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
  ngOnInit(): void {
    this.cart = this.ds.cart
    // this.ds.getMsg().subscribe((product:any) =>{
    //   this.cartItems.push({
    //     product_name: product.product_name,
    //     product_img: product.product_img,
    //     price: product.price
    //   })
    //   console.log(product)
    // })
  }


}
