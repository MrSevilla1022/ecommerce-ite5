import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  closeResult: string = '';
  @ViewChild('content') content: any ;

  openModal(){
    this.modalService.open(this.content, { centered: true });
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  open(content:any) {
    this.modalService.open(content);
  }

}
