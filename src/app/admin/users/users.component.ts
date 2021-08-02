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
  users:any
  transactionRec: any;
  orders:any
  page:any = 1
  pageSize:any=7

  searchkey:any
  constructor(public ds: ServiceService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTransactions()
    this.getOrders()
  }


  search(){
    if(this.searchkey == ""){
      this.gusers = this.users
    }else{
      this.gusers = this.gusers.filter((res:any) =>{
        return res.fname.toLocaleLowerCase().match(this.searchkey.toLocaleLowerCase())
      })
    }
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
    this.ds.sendApiRequest("user/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.gusers = data.payload
      this.users =data.payload
      console.log(this.gusers);
    })
  }

}
