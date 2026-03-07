import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const tokenStr = localStorage.getItem('access_token');
//     let token: string | null = null;
//     if (tokenStr) {
//       try {
//         const tokenObj = JSON.parse(tokenStr);
//         token = tokenObj.access_token;
//       } catch {}
//     }
//     if (token) {
//       const cloned = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next.handle(cloned);
//     } else {
//       return next.handle(req);
//     }
//   }
// }

export const authInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const tokenStr = localStorage.getItem('access_token');
  let token: string | null = null;
  if (tokenStr) {
    try {
      const tokenObj = JSON.parse(tokenStr);
      token = tokenObj.access_token;
    } catch {}
  }
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  } else {
    return next(req);
  }
};