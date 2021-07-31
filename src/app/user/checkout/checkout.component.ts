import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ServiceService } from '../../services/service.service'
import {formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [DatePipe]
})
export class CheckoutComponent implements OnInit {
  myDate = new Date();
  currentDate : any
  currentTime:any

  closeResult: string = '';
  @ViewChild('content') content: any ;


  cartItems:any = []
  cart:any = []
  user:any;
  total:any = 0
  finaltotal:any = 0
  logiPartner:any
  shippingfee:any
  openModal(){
    this.modalService.open(this.content, { centered: true });
  }

  constructor(private router:Router,private modalService: NgbModal, public ds: ServiceService,private datePipe: DatePipe) { }

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
    this.generateOrderId()
  }

   favoriteSeason: any;
  partners: string[] = ['GooglePay'];

  orders :any;
  orderId:any
  newOrderId:any = ""
  generateOrderId(){
    this.ds.sendApiRequest("orderTrans/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.orders = data.payload
      this.orderId = Number(this.orders[0].transaction_no)
      this.orderId++
      let stringId = String(this.orderId)
      let numOfZero = 6 - stringId.length
      for (let i = 0; i < numOfZero; i++) {
        this.newOrderId += '0'
      }
      this.newOrderId = this.newOrderId + stringId
      console.log(this.newOrderId)



      // sessionStorage.setItem('cart',JSON.stringify(data.payload))
    })
  }
  logiPartnerFinal:any
  saveLogiPartner(){
    this.logiPartnerFinal = this.logiPartner
    
  }

  paymentRequest:google.payments.api.PaymentDataRequest={
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
    {
        type: 'CARD',
        parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
        }
        }
    }
    ],
    merchantInfo: {
    merchantId: '12345678901234567890',
    merchantName: 'GearUp'
    },
    transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPriceLabel: 'Total',
    totalPrice: String(this.finaltotal),
    currencyCode: 'PHP',
    countryCode: 'PH'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
}
    onLoadPaymentData = (
      event: Event
    ): void => {
      const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
      console.log('load payment data', eventDetail.detail);
    }

    checkout:any = {}

    onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
      paymentData
      ) => {
        console.log('payment authorized', paymentData);
        console.log(this.finaltotal)
        this.currentDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
        console.log(this.currentDate)
        this.currentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds();
        console.log(this.currentTime)
        this.checkout.checkout_st = 1
        this.checkout.checkout_time = this.currentDate + " " +this.currentTime
        this.checkout.deliver_st = 0
        this.checkout.transaction_no = this.newOrderId
        this.checkout.payment = this.finaltotal
        // Add to transaction
        this.ds.sendApiRequest2("checkout/", this.checkout, this.user.user_id).subscribe((data:any) => {
        });
        sessionStorage.removeItem('cart');
        this.router.navigateByUrl('/user/orderstatus').then()
        // redirect to my orders
        return {
          transactionState: 'SUCCESS'
        };
      }

    onError = (event: ErrorEvent): void => {
      console.error('error', event.error);
    }

  computeTotal(){
    for(let i in this.cart){
        this.total+=this.cart[i].qty*this.cart[i].price
        this.finaltotal = this.total
    }
  }

  open(content:any) {
    this.modalService.open(content);
  }
  stringTotal:string = ""
  radiochange(event:any){
    this.shippingfee = 100
    this.finaltotal = this.total + this.shippingfee
    this.finaltotal.toString()
    this.stringTotal = this.finaltotal
    this.logiPartner = event.target.value
  }
}
