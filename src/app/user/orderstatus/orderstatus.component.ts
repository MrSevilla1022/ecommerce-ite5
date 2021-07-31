import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from '../../services/service.service'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss'],
  providers: [NgbModalConfig, NgbModal, DatePipe]
})
export class OrderstatusComponent implements OnInit {


  constructor(config: NgbModalConfig, private modalService: NgbModal, public ds: ServiceService, private datePipe: DatePipe) { }

  myDate = new Date();
  currentDate : any
  currentTime:any
  orderItems:any = []
  orders:any = []
  total:any = 0
  finaltotal:any = 0
  user:any;
  transactions:any
  currentRate = 0;
  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
      console.log(this.user)
    }
    this.ds.sendApiRequest("orders/"+this.user.user_id, null ).subscribe((data: any) => {
      sessionStorage.setItem('orders',JSON.stringify(data.payload))
    })
    //GET TRANSACTION_NO DISTINCT
    this.ds.sendApiRequest("transactions/", null ).subscribe((data: any) => {
      this.transactions = data.payload
      console.log(this.transactions)
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
  rateProd: any = {}
  rate(rate:any){
    // calculate new rating
    let newrate
    if(this.oldRating == 0){
      newrate = rate.rating 
    }else{
      newrate = (rate.rating + this.oldRating) / 2
    }

    this.rateProd.rating = newrate
    this.rateProd.sold = rate.sold
    this.rateProd.sold++
    this.rateProd.stock_avail = rate.stock_avail
    this.rateProd.stock_avail--
    alert('New:  ' + this.rateProd.rating)
    alert('Old rating:  ' + this.oldRating)
    alert('Product ID: ' + rate.product_id)
    this.ds.sendApiRequest2("updateRate/", this.rateProd, rate.product_id).subscribe((data:any) => {
    });
  }
  oldRating:any
  oldrate(rating:any){
    this.oldRating = rating
  }

  endTrans:any ={}
  endTransact(transno:any){
    this.currentDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
    console.log(this.currentDate)
    this.currentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds();
    console.log(this.currentTime)
    this.endTrans.received_time = this.currentDate + " " +this.currentTime
    this.endTrans.deliver_st = 1
    alert(transno)
    this.ds.sendApiRequest2("updateTransaction/", this.endTrans, transno).subscribe((data:any) => {
    });

    let index = this.transactions.findIndex((x:any) => x.transaction_no ===transno);
    this.transactions.splice(index, 1);


  }

  open(content: any) {
    this.modalService.open(content,{size: 'xl'});
  }

}
