import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class OrderstatusComponent implements OnInit {


  constructor(config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content,{size: 'xl'});
  }

}
