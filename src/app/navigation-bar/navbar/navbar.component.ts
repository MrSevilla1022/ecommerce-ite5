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

  userDetails:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth')

    if(storage){
      this.userDetails = JSON.parse(storage)
      console.log(this.userDetails)
    }else{

    }
  }

  signOut(){
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/auth/login').then()
  }

}
