import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ServiceService } from '../../services/service.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  closeResult: string = '';
  @ViewChild('content') content: any ;


  cartItems:any = []
  cart:any = []
  user:any;
  total:any = 0
  logiPartner:any
  shippingfee:any
  openModal(){
    this.modalService.open(this.content, { centered: true });
  }

  constructor(private modalService: NgbModal, public ds: ServiceService) { }

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
    this.computeTotal()
  }

   favoriteSeason: any;
  partners: string[] = ['J&T', 'GooglePay', 'LBC'];

  computeTotal(){
    for(let i in this.cart){
        this.total+=this.cart[i].qty*this.cart[i].price
    }
  }

  open(content:any) {
    this.modalService.open(content);
  }

  radiochange(event:any){
    this.shippingfee = 100
    this.logiPartner = event.target.value
  }
}
