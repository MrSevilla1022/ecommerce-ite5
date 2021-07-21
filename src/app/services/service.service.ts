import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  category_id:any
  baseURL: string = "http://localhost/ecommerce-ite5/gearup-api/";
  subject = new Subject()
  cart:any = []
  constructor(private http: HttpClient) { }


  sendMsg(product:any){
    console.log(product)
    this.subject.next(product)
    this.cart.push(product)
    sessionStorage.setItem('cart',JSON.stringify(this.cart))
  }
  getMsg(){
    return this.subject.asObservable()
  }

  sendApiRequest(method: any, data: any) {
    return <any>(
      this.http.post(this.baseURL + method, (JSON.stringify(data)))
    );
  }

  sendApiRequest2(method: string, data: any, condition: string) {
    return <any>(
      this.http.post(this.baseURL + method + condition, (JSON.stringify(data)))
    );
  }
}
