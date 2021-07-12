import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseURL: string = "http://localhost/ecommerce-ite5/gearup-api/";

  constructor(private http: HttpClient) { }

  sendApiRequest(method: any, data: any) {
    return <any>(
      this.http.post(this.baseURL + method, btoa(JSON.stringify(data)))
    );
  }

  sendApiRequest2(method: string, data: any, condition: string) {
    return <any>(
      this.http.post(this.baseURL + method + condition, btoa(JSON.stringify(data)))
    );
  }
}