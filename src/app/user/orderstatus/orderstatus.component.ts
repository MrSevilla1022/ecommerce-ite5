import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from '../../services/service.service'
@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class OrderstatusComponent implements OnInit {


  constructor(config: NgbModalConfig, private modalService: NgbModal, public ds: ServiceService) { }
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
    this.computeTotal()
  }
  computeTotal(){
    for(let i in this.orders){
        this.total+=this.orders[i].qty*this.orders[i].price
        this.finaltotal = this.total + 100
    }
  }
  open(content: any) {
    this.modalService.open(content,{size: 'xl'});
  }

}
