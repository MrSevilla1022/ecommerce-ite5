import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactionRec: any;

  constructor(public ds: ServiceService) { }

  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions(){
    this.ds.sendApiRequest("TransTable/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.transactionRec = data.payload
    })
  }

}
