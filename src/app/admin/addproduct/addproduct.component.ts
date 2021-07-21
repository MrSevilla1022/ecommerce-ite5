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

  products:any[] = []
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
    this.getProducts();
  }

  getProducts(){
    this.ds.sendApiRequest("products/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.products = data.payload
    })
  }

  open(content:any) {
    this.modalService.open(content);
  }

  openAddBrand(branding:any) {
    this.modalService.open(branding);
  }

  openPtype(ptype:any){
    this.modalService.open(ptype);
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



}
