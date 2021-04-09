import { TenantsService } from '../tenants.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../../shared/services/token-storage.service';
@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.sass']
})
export class AddTenantComponent implements OnInit {
  dataInfo: any;
  constructor(private fb : FormBuilder,private httpClient: HttpClient,private tenantsService:TenantsService,private dialog: MatDialog, private tokenStorageService: TokenStorageService) { 
    this.initForm();
    this.loadData();
  }
  private readonly API_URL = 'assets/data/sharedData.json';
  tenantDetails : FormGroup;
  iconText: string;
  popupText: string;
  hide = true;
  agree = false;
  sharedData : any;
  minDate: any = (new Date()).getDate();
  maxDate: any = (new Date()).getDate();
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
    alternateEmailId: [
      {type : 'pattern' , message: 'Alternate Email is not valid'},
    ],
    mobileNumber: [
      {type : 'pattern' , message: 'Mobile number is not valid'},
    ],
    taxPayerId: [
      {type : 'pattern' , message: 'Taxpayers ID is not valid'},
    ],
    taxIndentityType: [
      {type : 'pattern' , message: 'Tax identity type  is not valid'},
    ],
  };
  loadData(){
    this.httpClient.get(this.API_URL).subscribe(data =>{
      this.sharedData = data;
    });
  }
  initForm(){
    this.tenantDetails = this.fb.group({
      firstName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,50}')]],
      lastName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,50}')]],
      primaryEmail: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      alternateEmailId: ['',[Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      mobileNumber:['',[Validators.minLength(10), Validators.maxLength(15),Validators.pattern('[0-9]*')]],
      taxPayerId:['',[Validators.maxLength(50)]],
      taxIndentityType:['',[Validators.maxLength(50)]],
    });
  }
  ngOnInit(): void {
    let currentUser = this.tokenStorageService.getUser();
    if(currentUser.roles.some(e => e.roleName === "Tenant")){
      this.getTenantInfo(currentUser.id);
    }
  }
  onSubmit(){
    this.tenantsService.addTenants(this.tenantDetails.value).subscribe(
      data => {
        this.iconText="success";
        this.popupText=" User added successfully";
        this.openDialog(this.popupText,this.iconText);
        this.tenantDetails.reset();
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

  getTenantInfo(userId){
    this.tenantsService.getTenant(userId)
    .subscribe
    (
      data =>
      {
        if(data && data.responseCode === 200)
         { this.dataInfo = data.data;
          this.tenantDetails.patchValue(this.dataInfo);
        }
        else{
          this.popupText="Please try again";
          this.openDialog(this.popupText,this.iconText);
        }
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
  )
  }
}
