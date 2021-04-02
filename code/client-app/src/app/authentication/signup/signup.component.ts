import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


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
  ownerTypeData :any;
  subTypeData :any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthenticationService
  ) {
    this.ownerTypeData=this.authService.getPropertyType();
  }
  minDate: any = (new Date()).getDate();
  maxDate: any = (new Date()).getDate();
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,50}')]],
      lastName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,50}')]],
      dob : [''],
      primaryEmail: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      alternateEmail: ['',[Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
      mobileNumber:['',[Validators.minLength(10), Validators.maxLength(15),Validators.pattern('[0-9]*')]],
      officeNumber: ['',[Validators.minLength(10), Validators.maxLength(15),Validators.pattern('[0-9]*')]],
      streetAddress: ['',[Validators.maxLength(500)]],
      city: ['',[Validators.maxLength(50)]],
      state: ['',[Validators.maxLength(50)]],
      country:['',[Validators.maxLength(100)]],
      zip: ['',[Validators.maxLength(15)]],
      companyName: ['',[Validators.pattern('[a-zA-Z]{0,200}')]],
      experience: ['',[Validators.maxLength(50)]],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      typeofService: ['',[Validators.maxLength(50)]],
      ownerType: ['', [Validators.required]]
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
      this.router.navigate(['/dashboard/main']);
    }
  }
}
