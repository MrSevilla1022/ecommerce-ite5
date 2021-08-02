import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  gusers: any;
  transactionRec: any;
  orders:any
  constructor(public ds: ServiceService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTransactions()
    this.getOrders()
  }

  open(content:any) {
    this.modalService.open(content,{size: 'l'});
  }

  getOrders(){
    this.ds.sendApiRequest("orders/", null ).subscribe((data: any) => {
      sessionStorage.setItem('orders',JSON.stringify(data.payload))
      this.orders = data.payload
    })
  }

  getTransactions(){
    this.ds.sendApiRequest("transactions/", null ).subscribe((data: any) => {
      this.transactionRec = data.payload
      console.log(this.transactionRec)
    })
  }

  getProducts(){
    this.ds.sendApiRequest("UserTable/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.gusers = data.payload
      console.log(this.gusers);
    })
  }

}
