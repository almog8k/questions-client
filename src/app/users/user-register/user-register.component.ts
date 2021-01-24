import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  onRegister(form: NgForm){
    let formUser = form.value;
    const user = new User(formUser.username, formUser.password);
    this.userService.registerUser(user).subscribe();
   }
}
