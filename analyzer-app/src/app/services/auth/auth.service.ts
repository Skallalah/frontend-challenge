import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSource: BehaviorSubject<User> = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
  currentUser = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('/users/authenticate', { username, password })
      .pipe(map(user => {
        // Check if there is a JWT in the response : if so, consider the user authenticated
        if (user && user.token) {
          // Store user details and JWT token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSource.next(user);
        }

        return user;
      }));
  }

  /* Return the current user value without a need for a subscription */
  getCurrentUser(): User {
    return this.currentUserSource.getValue();
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSource.next(null);
  }
}
