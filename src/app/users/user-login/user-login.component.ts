import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {User} from '../models/user.model'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    let formUser = form.value;
    const user = new User(formUser.username, formUser.password);
    this.userService.loginUser(user).subscribe()
      form.reset();
   }
}
