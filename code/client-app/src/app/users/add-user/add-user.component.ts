import { UserService } from '../users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../../shared/services/token-storage.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {
  dataInfo: any;
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private userService: UserService, private dialog: MatDialog, private tokenStorageService: TokenStorageService) {
    this.initForm();
    this.loadData();
  }
  private readonly API_URL = 'assets/data/sharedData.json';
  userDetails: FormGroup;
  iconText: string;
  popupText: string;
  hide = true;
  agree = false;
  sharedData: any;
  minDate: any = (new Date()).getDate();
  maxDate: any = (new Date()).getDate();
  public errormessage = {
    firstName: [
      { type: 'required', message: 'First Name is required' },
      { type: 'pattern', message: 'First Name is not valid' },
    ],
    lastName: [
      { type: 'required', message: 'Last Name required' },
      { type: 'pattern', message: 'Last Name is not valid' },
    ],
    username: [
      { type: 'required', message: 'Primary Email required' },
      { type: 'pattern', message: 'Primary Email is not valid' },
    ],
    password: [
      { type: 'pattern', message: 'password is not valid' },
    ],
    type: [
      { type: 'pattern', message: 'Type is not valid' },
    ],
  };
  loadData() {
    this.httpClient.get(this.API_URL).subscribe(data => {
      this.sharedData = data;
    });
  }
  initForm() {
    this.userDetails = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,50}')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,50}')]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required]],
      type: ['', [Validators.minLength(10), Validators.maxLength(15), Validators.pattern('[0-9]*')]],
    });
  }
  ngOnInit(): void {
    let currentUser = this.tokenStorageService.getUser();
    if (currentUser.roles.some(e => e.roleName === "user")) {
      this.getuserInfo(currentUser.id);
    }
  }
  onSubmit() {
    this.userService.addUser(this.userDetails.value).subscribe(
      data => {
        this.iconText = "success";
        this.popupText = " User added successfully";
        this.openDialog(this.popupText, this.iconText);
        this.userDetails.reset();
      },
      err => {
        this.iconText = "error";
        if (err.status === 401) {
          this.popupText = " Unauthorized - Username or Password is Incorrect";
          this.openDialog(this.popupText, this.iconText);
        } else if (err.status === 404) {
          this.popupText = "Not Found - The Authentication URL is not valid";
          this.openDialog(this.popupText, this.iconText);
        } else if (err.status === 500) {
          this.popupText = "Internal Server Error at Server Side.";
          this.openDialog(this.popupText, this.iconText);
        }
        else {
          this.popupText = "Application Problem Please contact to Application Administrator ";
          this.openDialog(this.popupText, this.iconText);
        }
      }
    );
  } openDialog(popupText, iconText) {
    Swal.fire({
      icon: iconText,
      title: popupText,
    });
  }

  getuserInfo(userId) {
    this.userService.getUser(userId)
      .subscribe
      (
        data => {
          if (data && data.responseCode === 200) {
            this.dataInfo = data.data;
            this.userDetails.patchValue(this.dataInfo);
          }
          else {
            this.popupText = "Please try again";
            this.openDialog(this.popupText, this.iconText);
          }
        },
        err => {
          this.iconText = "error";
          if (err.status === 401) {
            this.popupText = " Unauthorized - Username or Password is Incorrect";
            this.openDialog(this.popupText, this.iconText);
          } else if (err.status === 404) {
            this.popupText = "Not Found - The Authentication URL is not valid";
            this.openDialog(this.popupText, this.iconText);
          } else if (err.status === 500) {
            this.popupText = "Internal Server Error at Server Side.";
            this.openDialog(this.popupText, this.iconText);
          }
          else {
            this.popupText = "Application Problem Please contact to Application Administrator ";
            this.openDialog(this.popupText, this.iconText);
          }
        }
      )
  }
}
