import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServiceService } from '../../services/service.service'
import { Products } from '../../model/products'
import Swal from 'sweetalert2';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';



@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class AddproductComponent implements OnInit {
 

  constructor(public ds: ServiceService, config: NgbModalConfig, private modalService: NgbModal) {

     // customize default values of modals used by this component tree
     config.backdrop = 'static';
     config.keyboard = false;
   }

  product = new Products(0,0,'','','',0,0)

  img:any;
  brand:any;
  type:any;
  pname:any;
  pdesc:any;
  price:any;
  quantity:any;
  types:any[]=[];
  brands:any[]=[];

  ngOnInit(): void {
    this.apitest()
    this.getTypes();
    this.getBrands();
  }

  open(content:any) {
    this.modalService.open(content);
  }

  getBrands(){
    this.ds.sendApiRequest("brand/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.brands = data.payload
    })
  }

  getTypes(){
    this.ds.sendApiRequest("category/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.types = data.payload
    })
  }

  apitest(){
    this.ds.sendApiRequest("user/", null ).subscribe((data: any) => {
      console.log(data);
    })
  }


  toUpload:any = {};
  upload(){
    this.product.product_img = this.imgSrc
    this.product.category_id = this.type
    this.product.brand_id = this.brand
    this.product.product_name = this.pname
    this.product.product_desc = this.pdesc
    this.product.price = this.price
    this.product.stock_avail = this.quantity
    console.log(this.product)

    this.ds.sendApiRequest("addProduct/", this.product)
          .subscribe((result: any)=>{
            console.log(result);
        });
      console.log(this.product)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'This product has been added!',
        showConfirmButton: false,
        timer: 1500
      })
  }

  imgSrc: string = "../../assets/gear.png"
  imageToUpload: any;

  onUploadHandler(file: any) {
    this.imageToUpload = file.target.files[0];
    // console.log(this.imageToUpload.name)
   console.log(this.imageToUpload.name,this.imageToUpload.type,this.imageToUpload.size);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgSrc = event.target.result;
      //console.log(this.imgSrc)
    }
    reader.readAsDataURL(this.imageToUpload);
  }

  countries = COUNTRIES

}

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];