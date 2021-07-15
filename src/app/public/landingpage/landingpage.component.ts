import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})


export class LandingpageComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  products:any[] = []
  constructor(public ds: ServiceService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.ds.sendApiRequest("products/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.products = data.payload
    })
  }

  
}
