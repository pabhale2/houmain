import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  ownerTypeData: any;
  subTypeData: any;
  popupText: string;
  iconText: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.ownerTypeData = this.authService.getPropertyType();
  }
  minDate: any = (new Date()).getDate();
  maxDate: any = (new Date()).getDate();
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,50}')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,50}')]],
      userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      mobileNumber: ['', [Validators.minLength(10), Validators.maxLength(15), Validators.pattern('[0-9]*')]],
      companyName: ['', [Validators.pattern('[a-zA-Z]{0,200}')]],
      password: ['', Validators.required],
      type: ['', [Validators.required]]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.registration(this.loginForm.value).subscribe(
        result => {
          if (result) {
            if (result['responseCode'] == 200) {
              this.router.navigate(['/authentication/signin']);
              this.popupText = "Registration Succesfully";
              this.iconText = "sccess";
            } else if (result['responseCode'] == 409) {
              this.popupText = "Duplicate user with given username";
              this.iconText = "warning";
            }
            this.openDialog(this.popupText, this.iconText);
          } else {
            this.popupText = "Problem while registration, please try again...";
            this.iconText = "error";
            this.openDialog(this.popupText, this.iconText);
          }
        },
        error => {
          this.popupText = "Problem while registration, please try again...";
          this.iconText = "error";
          this.openDialog(this.popupText, this.iconText);
        }
      );

    }
  }

  openDialog(popupText, iconText) {
    Swal.fire({
      icon: iconText,
      title: popupText,
    });
  }
}
