import { Owners } from './../owners.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OwnersService } from '../owners.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.sass']
})
export class EditOwnerComponent implements OnInit {
  ownerDetails : FormGroup;
  public errormessage={
    firstName: [
      {type : 'required' , message: 'First Name is required'},
      {type : 'pattern' , message: 'First Name is not valid'},
    ],
    lastName: [
      {type : 'required' , message: 'Last Name required'},
      {type : 'pattern' , message: 'Last Name is not valid'},
    ],
    companyName: [
      {type : 'pattern' , message: 'school Name is not valid'},
    ],
    primaryEmail: [
      {type : 'required' , message: 'Primary Email required'},
      {type : 'pattern' , message: 'Primary Email is not valid'},
    ],
    alternateEmail: [
      {type : 'pattern' , message: 'Alternate Email is not valid'},
    ],
    mobile: [
      {type : 'pattern' , message: 'Mobile number is not valid'},
    ],
    homeNumber: [
      {type : 'pattern' , message: 'Home Number is not valid'},
    ],
    officeNumber: [
      {type : 'pattern' , message: 'Office Number is not valid'},
    ],
    number: [
      {type : 'pattern' , message: 'Number is not valid'},
    ],
    streetAddress: [
      {type : 'maxLength' , message: 'street address must be less than 500 words'},
    ],
    city: [
      {type : 'pattern' , message: 'Name of the city must be less than 50 words'},
    ],
    state: [
      {type : 'pattern' , message: 'Name of the state must be less than 50 words'},
    ],
    zip: [
      {type : 'pattern' , message: 'zip is not valid'},
    ],
    country: [
      {type : 'pattern' , message: 'Name of the Country must be less than 100 words'},
    ],
    comments: [
      {type : 'pattern' , message: 'comment must be less than 250 words'},
    ],
    taxpayerID: [
      {type : 'pattern' , message: 'Taxpayers ID is not valid'},
    ],
    taxIndentityType: [
      {type : 'pattern' , message: 'Tax identity type  is not valid'},
    ],
  };
  dataInfo: any;
  iconText: string;
  popupText: string;
  constructor(private fb : FormBuilder,private httpClient: HttpClient,private ownerService:OwnersService,private route: ActivatedRoute) {
  this.initForm();}
  initForm(){
    this.ownerDetails = this.fb.group({
      firstName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,50}')]],
      lastName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,50}')]],
      companyName: ['',[Validators.pattern('[a-zA-Z]{0,200}')]],
      company : [''],
      dob : [''],
      startDate : [''],
      endDate : [''],
      primaryEmail: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      alternateEmail: ['',[Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      mobile:['',[Validators.minLength(10), Validators.maxLength(15),Validators.pattern('[0-9]*')]],
      homeNumber: ['',[Validators.minLength(10), Validators.maxLength(15),Validators.pattern('[0-9]*')]],
      officeNumber: ['',[Validators.minLength(10), Validators.maxLength(15),Validators.pattern('[0-9]*')]],
      number: ['',[Validators.minLength(10), Validators.maxLength(15),Validators.pattern('[0-9]*')]],
      streetAddress: ['',[Validators.maxLength(500)]],
      city: ['',[Validators.maxLength(50)]],
      state: ['',[Validators.maxLength(50)]],
      zip: ['',[Validators.maxLength(15)]],
      country:['',[Validators.maxLength(100)]],
      comments:['',[Validators.maxLength(250)]],
      taxpayerID:['',[Validators.maxLength(50)]],
      taxIndentityType:['',[Validators.maxLength(50)]],
    });
  }
  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.ownerService.getOwner(id)
    .subscribe
    (
      data =>
      {
          this.dataInfo = data.data;
          this.ownerDetails.controls['firstName'].setValue(this.dataInfo.firstName);
          this.ownerDetails.controls['lastName'].setValue(this.dataInfo.lastName);
          this.ownerDetails.controls['companyName'].setValue(this.dataInfo.companyName);
          this.ownerDetails.controls['primaryEmail'].setValue(this.dataInfo.primaryEmail);
          this.ownerDetails.controls['alternateEmail'].setValue(this.dataInfo.alternameEmail);
          this.ownerDetails.controls['mobile'].setValue(this.dataInfo.mobileNumber);
          this.ownerDetails.controls['homeNumber'].setValue(this.dataInfo.homeNumber);
          this.ownerDetails.controls['officeNumber'].setValue(this.dataInfo.officeNumber);
          this.ownerDetails.controls['streetAddress'].setValue(this.dataInfo.streetAddress);
          this.ownerDetails.controls['city'].setValue(this.dataInfo.city);
          this.ownerDetails.controls['state'].setValue(this.dataInfo.state);
          this.ownerDetails.controls['zip'].setValue(this.dataInfo.zip);
          this.ownerDetails.controls['taxpayerID'].setValue(this.dataInfo.taxpayerId);
          this.ownerDetails.controls['taxIndentityType'].setValue(this.dataInfo.taxIdentityType);
      }
  );
  }
  onSubmit(){
      console.log(this.ownerDetails.value);
      this.ownerService.addOwners(this.ownerDetails.value).subscribe(
        data => {
          this.iconText="success";
          this.popupText=" User added successfully";
          this.openDialog(this.popupText,this.iconText);
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
    }  openDialog(popupText,iconText){
      Swal.fire({
        icon: iconText,
        title: popupText,
      });
    }
  }
