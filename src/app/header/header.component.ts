import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged:boolean;

  constructor( public userService:UserService) { }

  ngOnInit(): void {
    this.userService.isLogged.subscribe(bool=> this.isLogged = bool);
  }
  logOut(){
    this.userService.logOut();
  }

}
