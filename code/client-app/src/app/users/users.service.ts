import { Injectable } from '@angular/core';
import { serverURL, clientIdSecretKey } from '../shared/url';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  dialogData: any;
  constructor(private httpClient: HttpClient) { }

  getDialogData() {
    return this.dialogData;
  }
  getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(serverURL + 'service/user/users?activeUser=1');
  }
  addUser(user) {
    const body = user;
    return this.httpClient.post(serverURL + 'service/user/save', body);
  }
  getUser(id): Observable<any> {
    const params1 = new HttpParams().set('userId', id);
    return this.httpClient.get<any>(serverURL + 'service/user/getByUserId', { params: params1 })
  }
}
