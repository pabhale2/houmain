import { User } from './../user.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {
  userDetails: FormGroup;
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
  dataInfo: any;
  iconText: string;
  popupText: string;
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private userService: UserService, private route: ActivatedRoute) {
    this.initForm();
  }
  initForm() {
    this.userDetails = this.fb.group({
      userId: ['0'],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,50}')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,50}')]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required]],
      type: ['', [Validators.minLength(10), Validators.maxLength(15), Validators.pattern('[0-9]*')]],
    });
  }
  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.userService.getUser(id)
      .subscribe
      (
        data => {
          this.dataInfo = data.data;
          this.populateUser(data.data);
          this.userDetails.patchValue(this.userDetails.value);
        }
      );
  }
  populateUser(data: any) {
    this.userDetails.value.firstName = data.user.firstName;
    this.userDetails.value.lastName = data.user.lastName;
    this.userDetails.value.username = data.user.username;
    this.userDetails.value.type = data.user.type;
  }
  onSubmit() {
    console.log(this.userDetails.value);
    this.userService.addUser(this.userDetails.value).subscribe(
      data => {
        this.iconText = "success";
        this.popupText = " User added successfully";
        this.openDialog(this.popupText, this.iconText);
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
}
