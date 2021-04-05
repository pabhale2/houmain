import { TokenStorageService } from './../../shared/services/token-storage.service';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  errorMessage: "";
  popupText: string;
  iconText: string;
  roles: string[] = [];
  isLoginFailed: boolean;
  isLoggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthenticationService,
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService
  ) {}
  public errorMessages = {
    username:[
      {type:'required',message:'Username is required'},
      {type:'pattern',pattern:'Please enter valid email address'}
    ],

    password:[
      {type:'required',message:'Password is required'},
      {type:'pattern',message:'Minimum 6 characters & Maximum 15 characters & must contain at least 1 uppercase letter & 1 special character & 1 number'}
    ]
  }
  ngOnInit() {
    this.router.navigate(['/dashboard']);
    this.loginForm = this.formBuilder.group({
       username: ["",[Validators.required , Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$")]],
       password:["",[Validators.required
        // ,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.authService.login(this.loginForm).subscribe(
      data => {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(data['access_token']);
       console.log(decodedToken);
        this.StoreLoggedUserDetails(data,decodedToken);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.popupText="Login Succesfull";
        this.iconText="success";
        this.openDialog(this.popupText,this.iconText);
        this.router.navigate(['/dashboard/applicant']);
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
  openDialog(popupText,iconText){
    Swal.fire({
      icon: iconText,
      title: popupText,
    });
  }

  StoreLoggedUserDetails(data,decodedToken){
    this.tokenStorage.saveToken(data['access_token']);
    this.authService.getUserDetailsByUsername(decodedToken.user_name).subscribe(
      data => {
        this.tokenStorage.saveUser(data['data']);
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
}
