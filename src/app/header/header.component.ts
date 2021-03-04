import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '../auth/user.service';
import * as fromApp from '../store/app.reducer'
import * as QuestionsListActions from '../questions/question-list/store/questions-list.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;

  constructor(public userService: UserService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userService.isLogged.subscribe(bool => this.isLogged = bool);



  }
  logOut() {
    this.userService.logOut();
  }

}
