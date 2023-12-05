import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

// This is a custom HttpInterceptor that will be used to intercept all HTTP requests
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url === 'https://cv-backend-4cdl9.ondigitalocean.app/user/refresh') {
    //to avoid infinite loop
    return next(req);
  }
  if (req.url === 'https://cv-backend-4cdl9.ondigitalocean.app/user/signin') {
    //to avoid intercepting login and signup requests
    return next(req);
  }
  if (req.url === 'https://cv-backend-4cdl9.ondigitalocean.app/user/signup') {
    //to avoid intercepting login and signup requests
    return next(req);
  }
  let router = inject(Router);
  let httpClient = inject(HttpClient);
  const accessToken = localStorage.getItem('accessToken');
  let decodedToken;
  if (accessToken) {
    decodedToken = jwtDecode(accessToken); //decode the token to get the expiry date
    console.log('decodedToken: ', decodedToken.exp, Date.now() / 1000);
    const isExpired =
      decodedToken && decodedToken.exp
        ? decodedToken.exp < Date.now() / 1000
        : false;
    if (isExpired) {
      //asking for new access token if expired
      console.log('Access token expired');
      try {
        httpClient
          .post(
            'https://cv-backend-4cdl9.ondigitalocean.app/user/refresh',
            {
              refreshToken: localStorage.getItem('refreshToken'),
            },
            { headers: { 'Content-Type': 'application/json' } }
          )
          .subscribe((response: any) => {
            if (response.status === 200) {
              localStorage.setItem('accessToken', response.accessToken);
              req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`,
                },
              });
              console.log('Access token refreshed');
              console.log('response: ', response);
              localStorage.setItem('accessToken', response.accessToken);
              return next(req);
            } else {
              console.log('Error refreshing token', response);
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              router.navigate(['/sign-in']);
              return null;
            }
          });
      } catch (e) {
        //if refresh token is expired so route to sign in page
        console.log(e);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        router.navigate(['/sign-in']);
      }
    }
    console.log('isExpired: ', isExpired);
  } else {
    console.log('accessToken not found');
  }

  console.log('token interceptor: ' + req.url);
  return next(req);
};
// import {
//   HttpClient,
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError, switchMap } from 'rxjs/operators';
// import { Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(private httpClient: HttpClient, private router: Router) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       let decodedAccessToken = jwtDecode(accessToken);
//       const isExpired =
//         decodedAccessToken && decodedAccessToken.exp
//           ? decodedAccessToken.exp < Date.now() / 1000
//           : false;
//       if (isExpired) {
//         console.log('Access token expired');
//         return this.httpClient
//           .post('http://localhost:5001/user/refresh', {
//             refreshToken: localStorage.getItem('refreshToken'),
//           })
//           .pipe(
//             switchMap((response: any) => {
//               localStorage.setItem('accessToken', response.accessToken);
//               const cloned = req.clone({
//                 setHeaders: {
//                   Authorization: `Bearer ${response.accessToken}`,
//                 },
//               });
//               return next.handle(cloned);
//             }),
//             catchError((error) => {
//               console.log('Error refreshing token', error);
//               localStorage.removeItem('accessToken');
//               localStorage.removeItem('refreshToken');
//               this.router.navigate(['/sign-in']);
//               return throwError(error);
//             })
//           );
//       } else {
//         console.log('Access token not expired');
//         const cloned = req.clone({
//           setHeaders: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         return next.handle(cloned);
//       }
//     }
//     return next.handle(req);
//   }
// }
