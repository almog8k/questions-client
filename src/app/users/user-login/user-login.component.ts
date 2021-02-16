import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/auth/user.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    let formUser = form.value;
    const user = { username: formUser.username, password: formUser.password, id: "" };
    this.userService.loginUser(user).subscribe()
    form.reset();
  }
}
