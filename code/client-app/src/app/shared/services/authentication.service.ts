import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { serverURL, clientIdSecretKey } from '../url';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  login(user){
    // const code=SECRET_CODE+':'+CLIENT_ID;

    const body = `username=${encodeURIComponent(user.value.username)}&password=${encodeURIComponent(user.value.password)}&grant_type=password`;
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: ('Basic ' + btoa(clientIdSecretKey))
      })
    };
     return this.http.post(serverURL + "oauth/token", body, requestOptions);
  }

  getPropertyType(){
    return [
       { "ownerType": "Property Owner" },
       { "ownerType": "Tenant" },
       { "ownerType": "Service Provider" }
      ]
  }

  
}
