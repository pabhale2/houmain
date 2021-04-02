import { Injectable } from '@angular/core';
import { serverURL, clientIdSecretKey } from '../shared/url';
import { BehaviorSubject, Observable } from 'rxjs';
import { Property } from './property.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PropertyService {
  dataChange: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>([]);
  dialogData: any;
  predictionUrl = "http://127.0.0.1:5000/predict";
  constructor(private httpClient:HttpClient) {  }

  getProperty(id): Observable<any>{
    const params1 = new HttpParams().set('propertyId', id);
    return this.httpClient.get<any>(serverURL + 'service/property/get', {params:params1})
  }
    
  getDialogData() {
    return this.dialogData;
  }
  getAllProperty(): Observable<Property[]> {
    return this.httpClient.get<Property[]>(serverURL+'service/property/getAll');
  }
  addProperty(Property){
   const body=Property;
   return this.httpClient.post(serverURL+'service/property/save', body);
  }
  predictPrice(data): Observable<any> {
    const body = data;
    return this.httpClient.post(this.predictionUrl,body);
  }
}
