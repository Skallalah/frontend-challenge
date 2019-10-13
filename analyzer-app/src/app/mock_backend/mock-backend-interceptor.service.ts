import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user/user';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

  private users: User[] = [
    { id: 0, username: 'digitalvalue', password: 'digitalpassword' }
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fakeToken');

    // Return an observable to simulate API calls
    return of(null).pipe(mergeMap(() => {

      // Get authenticate request and return corresponding user
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        const user = this.users.find(x => x.username === request.body.username
          && x.password === request.body.password);
        if (!user) return this.errorRequest('Username or password is incorrect');
        return this.okRequest({
          id: user.id,
          username: user.username,
          token: 'fakeToken'
        });
      }
      // Pass through any requests other than authentication, but check first if authorized (Mainly API file requests)
      if (!isLoggedIn) return this.unauthorisedRequest()
      else return next.handle(request);
    }));
  }


  okRequest(body) {
    return of(new HttpResponse({ status: 200, body }));
  }

  errorRequest(message) {
    return throwError({ status: 400, error: { message } });
  }

  unauthorisedRequest() {
    return throwError({ status: 401, error: { message: 'Unauthorised' } });
  }

  constructor() { }
}
