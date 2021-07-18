import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})


export class LandingpageComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  products:any[] = []
  helmet:any[] = []
  headlight:any[] = []
  constructor(public ds: ServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  seeMore(category_id:any){
    console.log(category_id)
    this.ds.category_id = category_id;
    sessionStorage.setItem('category_id', category_id);
    this.router.navigate(['/public/products']);
  }

  getProducts(){
    this.ds.sendApiRequest("products/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.products = data.payload
      for(let prods of this.products){
        if(this.helmet.length < 4){
          if(prods.category_id == 1){
            this.helmet.push(prods)
          }
        }
        if(this.headlight.length < 4){
          if(prods.category_id == 2){
            this.headlight.push(prods)
          }
        }
      }
    })
  }
}
