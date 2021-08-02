import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServiceService } from '../../services/service.service'
import { Products } from '../../model/products'
import { Branding } from '../../model/branding'
import { Categories } from '../../model/categories'
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
  vproducts:any[] = []
  constructor(public ds: ServiceService, config: NgbModalConfig, private modalService: NgbModal) {

     // customize default values of modals used by this component tree
     config.backdrop = 'static';
     config.keyboard = false;
   }

  product:any={}
  branding = new Branding('');
  categories = new Categories('');

  prodcategory:any;
  brandname:any;
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
  lastId:any
  async getProducts(){
    this.ds.sendApiRequest("products/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.products = data.payload
      for(let prod of this.products){
        this.lastId = prod.product_id
      }
      console.log(this.lastId)
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

  dummydata:any[]=[];
  openViewprod(viewprod:any, prodid:any){
    this.modalService.open(viewprod, prodid);
    this.ds.sendApiRequest("products/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.products = data.payload
      }
    )
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

  UploadBrand(){
    this.branding.brand = this.brandname;
    this.ds.sendApiRequest("addBrand/", this.branding)
          .subscribe((result: any)=>{
            console.log(result);
        });
      console.log(this.branding)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'This Brand has been added!',
        showConfirmButton: false,
        timer: 1500
      })
  }


  UploadCategory(){
    this.categories.category = this.prodcategory;
    this.ds.sendApiRequest("addCategory/", this.categories)
          .subscribe((result: any)=>{
            console.log(result);
        });
      console.log(this.categories)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'This Product has been added to categories!',
        showConfirmButton: false,
        timer: 1500
      })
  }



  toUpload:any = {};
  async upload(){

    this.product.product_img = this.imgSrc
    this.product.category_id = this.type
    this.product.brand_id = this.brand
    this.product.product_name = this.pname
    this.product.product_desc = this.pdesc
    this.product.price = this.price
    this.product.stock_avail = this.quantity

    this.ds.sendApiRequest("addProduct/", this.product)
          .subscribe((result: any)=>{
            console.log(result);
            this.ds.sendApiRequest("products/", null ).subscribe((data: any) => {

              this.products = data.payload
              console.log("New products");
              console.log(this.products );
            })
        });


      console.log(this.product)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'This product has been added!',
        showConfirmButton: false,
        timer: 1500
      })
      // this.lastId++
      // this.product.product_id = this.lastId
      // this.products.push(this.product)

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
