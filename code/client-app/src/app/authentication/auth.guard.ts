import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { TokenStorageService } from '../shared/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthenticationService,
               private router: Router,
               private tokenService: TokenStorageService ){}

  canActivate(): boolean {
      if(this.tokenService.getToken()){
        return true;
      }
      else{
        this.router.navigate(['/authentication']);
        return false;
      }
  }
}
