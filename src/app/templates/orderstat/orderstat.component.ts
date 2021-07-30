import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../../services/service.service'
@Component({
  selector: 'app-orderstat',
  templateUrl: './orderstat.component.html',
  styleUrls: ['./orderstat.component.scss']
})
export class OrderstatComponent implements OnInit {

  constructor(public ds: ServiceService) { }
  orderItems:any = []
  orders:any = []
  total:any = 0
  finaltotal:any = 0
  user:any;
  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
      console.log(this.user)
    }
    this.ds.sendApiRequest("orders/"+this.user.user_id, null ).subscribe((data: any) => {
      sessionStorage.setItem('orders',JSON.stringify(data.payload))
    })
    this.orderItems = sessionStorage.getItem('orders')
    this.orders = JSON.parse(this.orderItems)
  }

}
