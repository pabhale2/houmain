import { Injectable } from '@angular/core';
import { serverURL, clientIdSecretKey } from '../shared/url'
import { BehaviorSubject, Observable } from 'rxjs';
import { Property } from './property.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PropertyService {
  dataChange: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>([]);
  dialogData: any;
  predictionUrl = "http://127.0.0.1:5000/predict";
  topPredictUrl = "http://127.0.0.1:5000/topPredict"
  constructor(private httpClient: HttpClient) { }

  getProperty(id): Observable<any> {
    const params1 = new HttpParams().set('propertyId', id);
    return this.httpClient.get<any>(serverURL + 'service/property/get', { params: params1 })
  }

  getDialogData() {
    return this.dialogData;
  }
  getAllProperty(startIndex, pageSize): Observable<Property[]> {
    return this.httpClient.get<Property[]>(serverURL + 'service/property/getAll?startIndex=' + startIndex + '&pageSize=100');
  }

  getUnSoldProperties(): Observable<Property[]> {
    return this.httpClient.get<Property[]>(serverURL + 'service/property/getUnsoldProperties?startIndex=0&pageSize=100');
  }

  addProperty(Property) {
    const body = Property;
    return this.httpClient.post(serverURL + 'service/property/save', body);
  }
  predictPrice(data): Observable<any> {
    const body = data;
    return this.httpClient.post(this.predictionUrl, body);
  }

  topPredictPrice(data): Observable<any> {
    const body = data;
    return this.httpClient.post(this.topPredictUrl, body);
  }

  
  getServicesbyTypeId(typeId: any) {
    return this.httpClient.get(serverURL + 'service/getByTypeId?typeId=' + typeId);
  }
  createServiceRequest(serviceRequest: any) {
    const body = serviceRequest;
    return this.httpClient.post(serverURL + 'service/createServiceRequest', body);
  }
  serviceRequestByStatus(propertyId: number, type: string) {
    return this.httpClient.get(serverURL + 'service/propertyServiceRequests?propertyId=' + propertyId + '&status=' + type);
  }

  getAllServices() {
    // return this.httpClient.get<Request[]>(serverURL+'service/owner/getAll');
    return [{
     "id_property":"1",
     "property_name":"ABCD pvt.ltd",
     "property_type":"Commercial",
     "property_description":"ABC",
     "address":"ABC company , Xyz road, pqr_nagar,near abc shop",
     "city":"Pune",
     "state":"Maharashtra"
 },
 {
      "id_property":"1",
      "property_name":"ABCD pvt.ltd",
      "property_type":" ",
      "property_description":"ABC",
      "address":"ABC company , Xyz road, pqr_nagar,near abc shop",
      "city":"Pune",
      "state":"Maharashtra" 
 },
 {
      "id_property":"1",
      "property_name":"ABCD pvt.ltd",
      "property_type":" ",
      "property_description":"ABC",
      "address":"ABC company , Xyz road, pqr_nagar,near abc shop",
      "city":"Pune",
      "state":"Maharashtra"  
 },
 {
      "id_property":"1",
      "property_name":"ABCD pvt.ltd",
      "property_type":" ",
      "property_description":"ABC",
      "address":"ABC company , Xyz road, pqr_nagar,near abc shop",
      "city":"Pune",
      "state":"Maharashtra" 
 }
 ];
 
   }


}
