// using interceptor ca sa nu setam params/headers pentru fiecare request in parte. vom setat la nivel de aplicatie
// clone the request and the headers
// 7b821e7efd584a3eb2f5c2d924954f6d
// https://api.rawg.io/api/games?7b821e7efd584a3eb2f5c2d924954f6d
// GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
// GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'x-rapidapi-key': 'esGbwrm390mshS2BCl0RALxQRtZTp1W7sFMjsnyJlJzDXVkW0H',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
      },
      setParams: {
        key: '7b821e7efd584a3eb2f5c2d924954f6d',
      },
    });
    return next.handle(req);
  }
}
