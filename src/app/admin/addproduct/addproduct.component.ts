import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'
import { Products } from '../../model/products'
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  constructor(public ds: ServiceService) { }

  product = new Products(0,0,'','','',0,0)

  img:any;
  brand:any;
  type:any;
  pname:any;
  pdesc:any;
  price:any;
  quantity:any;


  ngOnInit(): void {
    this.apitest()
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
