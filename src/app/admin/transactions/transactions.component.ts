import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactionRec: any;
  orders:any
  constructor(public ds: ServiceService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.getTransactions()
    this.getOrders()
  }

  getOrders(){
    this.ds.sendApiRequest("orders/", null ).subscribe((data: any) => {
      sessionStorage.setItem('orders',JSON.stringify(data.payload))
      this.orders = data.payload
    })
  }

  open(content:any) {
    this.modalService.open(content,{size: 'xl'});
  }

  getTransactions(){
    this.ds.sendApiRequest("transactions/", null ).subscribe((data: any) => {
      this.transactionRec = data.payload
      console.log(this.transactionRec)
    })
  }

}
