import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverURL, clientIdSecretKey } from '../url';

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
       { "ownerType": "OWNER" },
       { "ownerType": "TENANT" }
      ]
  }
  registration(registerOption){
    const body = registerOption;
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
     return this.http.post(serverURL + "userMgt/register", body);
  }

  getUserDetailsByUsername(username: String) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.get(serverURL + "service/user/get?username="+username, requestOptions);
  }
}
