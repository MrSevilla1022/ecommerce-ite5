import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed = true;

  user:any;


  itemnum :any


  name:any
  cartItems:any = []
  cart:any = []
  constructor(private router:Router, public ds: ServiceService) { }

  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      this.user = JSON.parse(user_id)
      console.log(this.user)
    }

    this.cartItems = sessionStorage.getItem('cart')
    this.cart = JSON.parse(this.cartItems)
    this.ds.resultList$ = this.cart.length
    this.itemnum = this.ds.resultList$
    console.log(this.itemnum)
  }

  signOut(){
    localStorage.removeItem('user_id');
    sessionStorage.removeItem('cart');
    this.router.navigateByUrl('/auth/login').then()
  }

}
