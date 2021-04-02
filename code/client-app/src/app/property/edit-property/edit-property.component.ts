import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PropertyServiceService } from '../property-service.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.sass']
})
export class EditPropertyComponent implements OnInit {
  propertyDetails : FormGroup;
  propertyTypeData :any;
  PropertySubTypeData:any;
  public errormessage={
    propertyName: [
      {type : 'required' , message: 'Property Name is required'},
      {type : 'pattern' , message: 'Property Name is not valid'},
    ],
    propertyType: [
      {type : 'required' , message: 'Property Type required'},
      {type : 'pattern' , message: 'Property Type is not valid'},
    ],
    propertySubType: [
      {type : 'required' , message: 'Property Subtype required'},
      {type : 'pattern' , message: 'Property subtype is not valid'},
    ]
  };
  dataInfo: any;
  iconText: string;
  popupText: string;
  constructor(
    private fb : FormBuilder,
    private httpClient: HttpClient,
    private propertyService: PropertyServiceService,
    private route: ActivatedRoute)
   {
      this.initForm();
      this.propertyTypeData=this.propertyService.getPropertyType();
   }
  initForm(){
    this.propertyDetails = this.fb.group({
      propertyName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,50}')]],
      propertyType:['',[Validators.maxLength(100)]],
      propertySubType:['',[Validators.maxLength(100)]]
    });
  }
  loadData(newvalue){
      console.log(newvalue);
      this.PropertySubTypeData=this.propertyService.getPropertySubType(newvalue);
  }
  ngOnInit() {

   //   const id = +this.route.snapshot.params['id'];
  //   this.ownerService.getOwner(id)
  //   .subscribe
  //   (
  //     data =>
  //     {
  //         this.dataInfo = data.data;
  //         this.propertyDetails.controls['propertyName'].setValue(this.dataInfo.propertyName);
  //         this.propertyDetails.controls['propertyType'].setValue(this.dataInfo.propertyType);
  //         this.propertyDetails.controls['propertySubType'].setValue(this.dataInfo.propertySubType);
  //     }
  // );
  }
  onSubmit(){
    console.log(this.propertyDetails.value);
    //   this.ownerService.addOwners(this.propertyDetails.value).subscribe(
    //     data => {
    //       this.iconText="success";
    //       this.popupText=" User added successfully";
    //       this.openDialog(this.popupText,this.iconText);
    //     },
    //     err => {
    //       this.iconText="error";
    //       if(err.status === 401 ){
    //         this.popupText=" Unauthorized - Username or Password is Incorrect";
    //         this.openDialog(this.popupText,this.iconText);
    //       }else if(err.status === 404){
    //         this.popupText="Not Found - The Authentication URL is not valid";
    //         this.openDialog(this.popupText,this.iconText);
    //       }else if(err.status === 500){
    //         this.popupText="Internal Server Error at Server Side.";
    //         this.openDialog(this.popupText,this.iconText);
    //       }
    //       else{
    //         this.popupText="Application Problem Please contact to Application Administrator ";
    //         this.openDialog(this.popupText,this.iconText);
    //       }
    //     }
    //   );
    // }  openDialog(popupText,iconText){
    //   Swal.fire({
    //     icon: iconText,
    //     title: popupText,
    //   });
    }

}
