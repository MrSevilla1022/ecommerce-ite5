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
  page:any = 1
  pageSize:any=7
  products:any[] = []
  vproducts:any[] = []
  searchkey:any
  constructor(public ds: ServiceService, config: NgbModalConfig, private modalService: NgbModal) {

     // customize default values of modals used by this component tree
     config.backdrop = 'static';
     config.keyboard = false;
   }


  product:any={}
  branding = new Branding('');
  categories = new Categories('');

  prodcategory:any;
  img:any;
  brand:any;
  type:any;
  pname:any;
  pdesc:any;
  price:any;
  quantity:any;
  types:any[]=[];
  brands:any[]=[];
  allprod:any[] = []
  ngOnInit(): void {
    this.apitest()
    this.getTypes();
    this.getBrands();
    this.getProducts();

  }
  search(){

    this.category = "All"
    this.brandname = "Brand"
    if(this.searchkey == ""){
      this.products = this.allprod
    }else{
      this.products = this.products.filter(res =>{
        return res.product_name.toLocaleLowerCase().match(this.searchkey.toLocaleLowerCase())
      })
    }
  }
// SORTING

helmet:any[] = []
gloves:any[] = []
headlight:any[] = []
category:any = "Category"
radioCheck = false
radioCheck2 = false
radioCheck3 = false
radioCheck4 = false
radioCheck5 = false
sortCateg(cat:any){
  if(cat == "helmet"){
    this.products = this.helmet
    this.category = "Helmet"

    this.brandname = "Brand"
    this.radioCheck = false
    this.radioCheck2 = false
    this.radioCheck3 = false
    this.radioCheck4 = false
  }
  if(cat == "hl"){
    this.products = this.headlight
    this.category = "Headlight"
    this.brandname = "Brand"
    this.radioCheck = false
    this.radioCheck2 = false
    this.radioCheck3 = false
    this.radioCheck4 = false
  }
  if(cat == "gloves"){
    this.products = this.gloves
    this.brandname = "Brand"
    this.category = "Gloves"
    this.radioCheck = false
    this.radioCheck2 = false
    this.radioCheck3 = false
    this.radioCheck4 = false
  }
  if(cat == "all"){
    this.products = this.allprod
    this.brandname = "Brand"
    this.category = "All"
    this.radioCheck = false
    this.radioCheck2 = false
    this.radioCheck3 = false
    this.radioCheck4 = false
  }
}
brandname:any = "Brand"
sortBrand(brand:any){
  if(brand == "all"){
    this.products = this.allprod
    this.brandname = "All"
    this.category = "All"
  }
  if(brand == "n1"){
    this.products = this.nitro
    this.brandname = "Nitro"
    this.category = "All"
  }
  if(brand == "evo"){

    this.brandname = "Evo"
    this.products = this.evo
    this.category = "All"
  }
  if(brand == "sealight"){

    this.brandname = "Sealight"
    this.products = this.sealight
    this.category = "All"
  }
  if(brand == "biltwell"){
    this.brandname = "Bitwell"
    this.products = this.biltwell
    this.category = "All"
  }
  if(brand == "hjc"){

    this.brandname = "HJC"
    this.products = this.HJC
    this.category = "All"
  }
  if(brand == "nexx"){
    this.brandname = "Nexx"
    this.products = this.nexx
    this.category = "All"
  }
  if(brand == "shark"){
    this.brandname = "Shark"
    this.products = this.shark
    this.category = "All"
  }
  if(brand == "zeus"){
    this.brandname = "Zues"
    this.products = this.zeus
    this.category = "All"
  }
  if(brand == "spidi"){
    this.brandname = "Spidi"
    this.products = this.spidi
    this.category = "All"
  }
}

sortRate(rate:any){
  if(rate == 5){
    this.products = this.rate5
    this.radioCheck = false
    this.radioCheck2 = false
    this.radioCheck3 = false
    this.radioCheck4 = false
    this.category = "All"
  }
  if(rate == 4){
    this.products = this.rate4
    this.radioCheck = false
    this.radioCheck2 = false
    this.radioCheck3 = false
    this.radioCheck4 = false
    this.category = "All"
  }
  if(rate == 3){
    this.products = this.rate3
    this.radioCheck = false
    this.radioCheck2 = false
    this.radioCheck3 = false
    this.radioCheck4 = false
    this.category = "All"
  }
  if(rate == 2){
    this.products = this.rate2
    this.radioCheck = false
    this.radioCheck2 = false
    this.radioCheck3 = false
    this.radioCheck4 = false
    this.category = "All"
  }
  if(rate == 1){
    this.products = this.rate1
    this.radioCheck = false
    this.radioCheck2 = false
    this.radioCheck3 = false
    this.radioCheck4 = false
    this.category = "All"
  }
}

rate1:any[]=[]
rate2:any[]=[]
rate3:any[]=[]
rate4:any[]=[]
rate5:any[]=[]

evo:any[] = []
nitro:any[] = []
sealight:any = []
biltwell:any = []
shark:any = []
HJC:any = []
nexx:any = []
zeus: any = []
spidi: any = []
// SORTING

  lastId:any
  async getProducts(){
    this.ds.sendApiRequest("products/", null ).subscribe((data: any) => {
      console.log(data.payload);
      this.products = data.payload
      this.allprod =data.payload
      for(let prods of this.products){
        if(prods.category_id == 1){
          this.helmet.push(prods)
        }

        if(prods.category_id == 2){
          this.headlight.push(prods)
        }

        if(prods.category_id == 3){
          this.gloves.push(prods)
        }

        //SORT BRAND
        if(prods.brand_id == 1){
          this.nitro.push(prods)
        }
        if(prods.brand_id == 2){
          this.evo.push(prods)
        }
        if(prods.brand_id == 3){
          this.sealight.push(prods)
        }
        if(prods.brand_id == 4){
          this.biltwell.push(prods)
        }
        if(prods.brand_id == 5){
          this.HJC.push(prods)
        }
        if(prods.brand_id == 6){
          this.nexx.push(prods)
        }
        if(prods.brand_id == 7){
          this.shark.push(prods)
        }
        if(prods.brand_id == 8){
          this.zeus.push(prods)
        }
        if(prods.brand_id == 9){
          this.spidi.push(prods)
        }

        if(prods.rating >= 1){
          this.rate1.push(prods)
        }
        if(prods.rating >= 2){
          this.rate2.push(prods)
        }
        if(prods.rating >= 3){
          this.rate3.push(prods)
        }
        if(prods.rating >= 4){
          this.rate4.push(prods)
        }
        if(prods.rating >= 5){
          this.rate5.push(prods)
        }
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
  openViewprod(content:any, ){
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
