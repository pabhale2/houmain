import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverURL } from '../shared/url';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  constructor(
    private http: HttpClient
  ) { }
  
  getServiceDetail(){
    return {
      "id":"1",
      "fullName": "Nikhil Khartode",
      "serviceDate":"2018-02-25" ,
      "address":"khopoli",
      "mobile":"7083307395",
      "serviceType": "Painting",
      "status":"Accepted",
      "email":"ABC@gmail.com"
      };
  }
  getAllServiceRequestByStatus(status: string) {
    return this.http.get(serverURL + 'service/serviceRequestByStatus?status='+status);
  }

  getPrpertyAssignedToVendor(vendorId){
    return this.http.get(serverURL + 'service/propertyAssignToVendor?vendorId=' +vendorId);
  }

}
