import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { TokenStorageService } from '../shared/services/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector: Injector) { }

  intercept(req, next){
    let tokenizedReq =  req.clone();
    if(req.url.indexOf('oauth/token')===-1) {
      let tokenStorageService = this.injector.get(TokenStorageService);
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenStorageService.getToken()}`,
          'content-type': 'application/json'
        }
      })
    }
    return next.handle(tokenizedReq);
  }
}
