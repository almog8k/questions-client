import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { IUser } from '../users/models/user.model';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "http://localhost:3000/auth";
  isLogged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {

  }
  loginUser(user: IUser) {
    return this.http.post<any>(`${this.baseUrl}/login`, user, {
    }).pipe(
      map((res) => {
        alert(res.message);
        if (res && res.token) {
          localStorage.setItem('userToken', res.token);
          localStorage.setItem('userName', res.user.username);
          this.router.navigate(['/questions']);
        }
      }),
      catchError(this.handleError)
    );
  }
  registerUser(user: IUser) {
    return this.http.post<any>(`${this.baseUrl}/register`, user, {
    }).pipe(
      map((res) => {
        alert(res.message);
        this.router.navigate(["/"])
      }),
      catchError(this.handleError)
    );
  }
  loggedIn() {
    this.isLogged.next(!!localStorage.getItem('userToken'));
    return !!localStorage.getItem('userToken');
  }
  getToken() {
    return localStorage.getItem('userToken');
  }
  logOut() {
    this.isLogged.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }

  private handleError(res: any) {
    let err = res.error.message;
    alert(err);
    return throwError(err);
  }
}
