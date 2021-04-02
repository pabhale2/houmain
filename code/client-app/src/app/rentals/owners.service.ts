import { Injectable } from '@angular/core';
import { serverURL, clientIdSecretKey } from '../shared/url';
import { BehaviorSubject, Observable } from 'rxjs';
import { Owners } from './owners.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class OwnersService {
  dataChange: BehaviorSubject<Owners[]> = new BehaviorSubject<Owners[]>([]);
  dialogData: any;
  constructor(private httpClient: HttpClient) {}

  getDialogData() {
    return this.dialogData;
  }
  getAllOwners(): Observable<Owners[]> {
    return this.httpClient.get<Owners[]>(serverURL+'service/owner/getAll');
  }
  addOwners(owner){
   const body=owner;
   return this.httpClient.post(serverURL+'service/owner/save', body);
  }
  getOwner(id): Observable<any>{
    const params1 = new HttpParams().set('ownerId', id);
    return this.httpClient.get<any>(serverURL + 'service/owner/get', {params:params1})
  }
}
