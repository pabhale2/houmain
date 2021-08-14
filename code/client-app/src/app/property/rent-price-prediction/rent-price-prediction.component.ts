import { PropertyService } from './../property.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OwnersService } from 'src/app/rentals/owners.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rent-price-prediction',
  templateUrl: './rent-price-prediction.component.html',
  styleUrls: ['./rent-price-prediction.component.scss']
})



export class RentPricePredictionComponent implements OnInit {
  iconText: string;
  popupText: string;
  minRent: any;
  maxRent: any;
  flags = [
    { "flag": "Yes" },
    { "flag": "No" }
   ]
  constructor(private fb : FormBuilder,private httpClient: HttpClient ,private propertyService:PropertyService,private dialog: MatDialog) { }
  propertyDetails : FormGroup;
  resultFlag: boolean;
  result:any;
  areaInfo : any;
  locInfo :any;
  priceInfo :any;
  area=[];
  location =[];
  price =[];

  public errormessage={
    area: [
      {type : 'required' , message: 'area is required'},
      {type : 'pattern' , message: 'area is not valid'},
    ],
    bedroomCount: [
      {type : 'required' , message: 'bedroomCount required'},
      {type : 'pattern' , message: 'bedroomCount is not valid'},
    ],
    maintenanceStaff: [
      {type : 'required' , message: 'maintenance Staff required'},
      {type : 'pattern' , message: 'maintenance Staff count is not valid'},
    ],
    security: [
      {type : 'required' , message: 'security required'},
    ],
    latitude: [
      {type : 'required' , message: 'latitude is not valid'},
    ],
    longitude: [
      {type : 'required' , message: 'longitude is not valid'},
    ],
  };
  ngOnInit(): void {
    this.initForm();
    
  }

  

  


  initForm(){
    this.propertyDetails = this.fb.group({
      area: ['', [Validators.required,Validators.pattern('[0-9]{1,10}')]],
      bedroomCount: ['', [Validators.required,Validators.pattern('[0-9]{1,2}')]],
      maintenanceStaff: ['',[Validators.required]],
      security : ['',[Validators.required]],
      latitude : ['',[Validators.required]],
      longitude : ['',[Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.propertyDetails.value);
    this.propertyDetails.value.maintenanceStaff =  this.propertyDetails.value.maintenanceStaff === "Yes"?"1":"0";
    this.propertyDetails.value.security =  this.propertyDetails.value.security === "Yes"?"1":"0";
    this.propertyService.predictPrice(this.propertyDetails.value).subscribe(
      data => {
        this.result = data.price;
        this.minRent = Math.floor(this.result * 1000 *2.5 /12);
        this.maxRent = Math.floor(this.result * 1000 *3/12);
        this.result = Math.floor(this.result);
        this.iconText="success";
        this.popupText=" predicted value successfully";
        this.openDialog(this.popupText,this.iconText);
        this.resultFlag = true;
        
      },
      err => {
        this.iconText="error";
        if(err.status === 401 ){
          this.popupText=" Unauthorized - Username or Password is Incorrect";
          this.openDialog(this.popupText,this.iconText);
        }else if(err.status === 404){
          this.popupText="Not Found - The Authentication URL is not valid";
          this.openDialog(this.popupText,this.iconText);
        }else if(err.status === 500){
          this.popupText="Internal Server Error at Server Side.";
          this.openDialog(this.popupText,this.iconText);
        }
        else{
          this.popupText="Application Problem Please contact to Application Administrator ";
          this.openDialog(this.popupText,this.iconText);
        }
      }
    );



    this.propertyService.topPredictPrice(this.propertyDetails.value).subscribe(
      data => {

        
        this.result = data.price;
        this.minRent = Math.floor(this.result * 1000 *2.5 /12);
        this.maxRent = Math.floor(this.result * 1000 *3/12);
        this.result = Math.floor(this.result);
        this.iconText="success";
        this.popupText=" predicted value successfully";
        
        this.resultFlag = true;
        this.areaInfo = data['Area'];
        this.locInfo = data['Location'];
        this.priceInfo = data['Price'];
        console.log(this.locInfo);
        console.log(this.areaInfo);
        this.loadData();
      },
      err => {
        this.iconText="error";
        if(err.status === 401 ){
          this.popupText=" Unauthorized - Username or Password is Incorrect";
          this.openDialog(this.popupText,this.iconText);
        }else if(err.status === 404){
          this.popupText="Not Found - The Authentication URL is not valid";
          this.openDialog(this.popupText,this.iconText);
        }else if(err.status === 500){
          this.popupText="Internal Server Error at Server Side.";
          this.openDialog(this.popupText,this.iconText);
        }
        else{
          this.popupText="Application Problem Please contact to Application Administrator ";
          this.openDialog(this.popupText,this.iconText);
        }
      }
    );
    
    
  } 

  public loadData() {
    
      for(let key in this.areaInfo)
          {
            let value= this.areaInfo[key];
            this.area.push(value);
          }
          console.log(this.area);

          for(let key in this.locInfo)
          {
            let value= this.locInfo[key];
            this.location.push(value);
          }
          console.log(this.location);

          for(let key in this.priceInfo)
          {
            let value= this.priceInfo[key];
            this.price.push(value);
          }
          console.log(this.price);
   }

   openDialog(popupText,iconText){
    Swal.fire({
      icon: iconText,
      title: popupText,
    });
  }

}
