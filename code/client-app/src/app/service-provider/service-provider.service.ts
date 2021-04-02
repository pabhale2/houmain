import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  constructor() { }

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
  getAllService(){
    return [{
      "id":"1",
      "fullName": "Nikhil Khartode",
      "serviceDate":"2018-02-25" ,
      "address":"khopoli",
      "mobile":"7083307395",
      "serviceType": "Painting",
      "status":"Accepted"
      },
      {
        "id":"2",
        "fullName": "Pavan Kalaskar",
       "serviceDate":"2018-02-25" ,
       "address":"khopoli",
      "mobile":"7083307395",
      "serviceType": "Painting",
      "status":"in Progress"
      }
    ]
  }
}
