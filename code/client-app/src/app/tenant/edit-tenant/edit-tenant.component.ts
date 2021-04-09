import { Tenants } from './../tenants.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TenantsService } from '../tenants.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.sass']
})
export class EditTenantComponent implements OnInit {
  tenantDetails : FormGroup;
  public errormessage={
    firstName: [
      {type : 'required' , message: 'First Name is required'},
      {type : 'pattern' , message: 'First Name is not valid'},
    ],
    lastName: [
      {type : 'required' , message: 'Last Name required'},
      {type : 'pattern' , message: 'Last Name is not valid'},
    ],
    primaryEmail: [
      {type : 'required' , message: 'Primary Email required'},
      {type : 'pattern' , message: 'Primary Email is not valid'},
    ],
    alternateEmail: [
      {type : 'pattern' , message: 'Alternate Email is not valid'},
    ],
    mobileNumber: [
      {type : 'pattern' , message: 'Mobile number is not valid'},
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
  constructor(private fb : FormBuilder,private httpClient: HttpClient,private tenantsService:TenantsService,private route: ActivatedRoute) {
  this.initForm();}
  initForm(){
    this.tenantDetails = this.fb.group({
      tenantId:['0'],
      firstName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,50}')]],
      lastName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,50}')]],
      primaryEmail: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      alternateEmail: ['',[Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      mobileNumber:['',[Validators.minLength(10), Validators.maxLength(15),Validators.pattern('[0-9]*')]],
      taxpayerID:['',[Validators.maxLength(50)]],
      taxIndentityType:['',[Validators.maxLength(50)]],
    });
  }
  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.tenantsService.getTenant(id)
    .subscribe
    (
      data =>
      {
          this.dataInfo = data.data;
          this.populateTenant(data.data);
          this.tenantDetails.patchValue(this.tenantDetails.value);
      }
  );
  }
  populateTenant(data: any) {
    this.tenantDetails.value.firstName = data.user.firstName;
    this.tenantDetails.value.lastName = data.user.lastName;
    this.tenantDetails.value.primaryEmail = data.user.username;
    this.tenantDetails.value.mobileNumber = data.mobileNumber;
    this.tenantDetails.value.alternateEmail =data.alternateEmailId;
    this.tenantDetails.value.taxpayerID =data.taxPayerId;
    this.tenantDetails.value.tenantId = data.tenantId;
  }
  onSubmit(){
      console.log(this.tenantDetails.value);
      this.tenantsService.addTenants(this.tenantDetails.value).subscribe(
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
