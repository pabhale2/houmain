import { ExampleDataSource } from './../staff/allstaff/allstaff.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  constructor() { }
  getPropertyType(){
    return [
       { "typeId":1,"propertyType": "Residential" },
       { "typeId":2,"propertyType": "Commercial" }
      ]
  }
  getPropertySubType(newValue){
   if(newValue=="Residential"){
    return [
      { "propertySubType": "Condo / Town Home" },
      { "propertySubType": "MultiFamily" },
      { "propertySubType": "Single Family" }
     ]
   };
  return[
    { "propertySubType": "Industrial" },
    { "propertySubType": "Office " },
    { "propertySubType": "Rental" },
    { "propertySubType": "Shopping Center" },
    { "propertySubType": "Storage" },
    { "propertySubType": "Parking Space" }
   ]
  }
  getPropertyPhotoCategory(){
  //  if(newValue=="Residential"){
     return [
       { "PropertyPhotoCategory": "Hall" },
       { "PropertyPhotoCategory": "Bed" },
       { "PropertyPhotoCategory": "Gallary" },
       { "PropertyPhotoCategory": "Kitchen" },
       { "PropertyPhotoCategory": "BatchRoom" },
       { "PropertyPhotoCategory": "Toilet" },
       { "PropertyPhotoCategory": "Surroundings" },
     { "PropertyPhotoCategory": "Entry Gate" },
     { "PropertyPhotoCategory": "Building Photos " },
     { "PropertyPhotoCategory": "Other" },
    ]
   }
}
