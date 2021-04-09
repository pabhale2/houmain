import { Injectable } from '@angular/core';
import { serverURL, clientIdSecretKey } from '../shared/url';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tenants } from './tenants.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class TenantsService {
  dataChange: BehaviorSubject<Tenants[]> = new BehaviorSubject<Tenants[]>([]);
  dialogData: any;
  constructor(private httpClient: HttpClient) { }

  getDialogData() {
    return this.dialogData;
  }
  getAllTenants(): Observable<Tenants[]> {
    return this.httpClient.get<Tenants[]>(serverURL + 'service/tenant/getAll');
  }
  addTenants(tenant) {
    const body = tenant;
    return this.httpClient.post(serverURL + 'service/tenant/save', body);
  }
  getTenant(id): Observable<any> {
    const params1 = new HttpParams().set('userId', id);
    return this.httpClient.get<any>(serverURL + 'service/tenant/getByUserId', { params: params1 })
  }
}
