import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  onRegister(form: NgForm) {
    let formUser = form.value;
    const user = { username: formUser.username, password: formUser.password, id: "" };
    this.userService.registerUser(user).subscribe();
  }
}
