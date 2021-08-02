import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactionRec:any[]=[]
  orders:any
  page:any = 1
  pageSize:any=7
  constructor(public ds: ServiceService,
    private modalService: NgbModal,config: NgbModalConfig) { }

  ngOnInit(): void {
    this.getTransactions()
    this.getOrders()
  }

  delivered:any[]=[]
  checkedout:any[]=[]
  transactionRec2:any[]=[]
  status:any = "Status"
  sortStatus(status:any){
    if(status == "all"){
      this.transactionRec = this.transactionRec2
      this.status = "All"
    }
    if(status == "checkout"){
      this.transactionRec = this.checkedout
      this.status = "Checked out"
    }
    if(status == "delivered"){
      this.transactionRec = this.delivered
      this.status = "Delivered"
    }
  }

  getOrders(){
    this.ds.sendApiRequest("orders/", null ).subscribe((data: any) => {
      sessionStorage.setItem('orders',JSON.stringify(data.payload))
      this.orders = data.payload
    })
  }

  open(content:any) {
    this.modalService.open(content,{size: 'l'});
  }

  getTransactions(){
    this.ds.sendApiRequest("transactions/", null ).subscribe((data: any) => {
      this.transactionRec = data.payload
      this.transactionRec2 = data.payload
      for(let tr of this.transactionRec){
        if(tr.deliver_st == 1){
          this.delivered.push(tr)
        }
        if(tr.deliver_st == 0){
          this.checkedout.push(tr)
        }
      }
      console.log(this.checkedout)
      console.log(this.transactionRec)
    })
  }

}
