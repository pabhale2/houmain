import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { PropertyService } from "../property.service";
import { Property } from "../property.model";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { AddPhotosComponent } from "../add-photos/add-photos.component";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-view-property",
  templateUrl: "./view-property.component.html",
  styleUrls: ["./view-property.component.scss"],
})
export class ViewPropertyComponent implements OnInit {

  servicesData: any;
  serviceForm: FormGroup;
  container = new MatTableDataSource();
  displayedColumns = [];
  displayedColumnsforServiceRequestHistroy: string[] = ['id', 'service.id', 'comment', 'vendorId', 'status'];

  public property = [];
  dialog: any;
  constructor(
    private propertyService: PropertyService,
    public http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.serviceForm = this.formBuilder.group({
      propertyId: [''],
      serviceId: new FormArray([]),
      comment: [''],
    });
  }
  dataInfo: any;
  iconText: string;
  popupText: string;
  length: number;
  pageIndex = 1;
  pageSize: number = 1;
  pageSizeOptions = [1, 5, 10, 50];
  serviceRequestHistory = [];
  get servicesFormArray() {
    return this.serviceForm.controls.serviceId as FormArray;
  }

  private addCheckboxes() {
    this.servicesData.forEach(() => this.servicesFormArray.push(new FormControl(false)));
  }

  requestForService() {
    const selectedServiceNames = this.serviceForm.value.serviceId
      .map((checked, i) => checked ? this.servicesData[i].id : null)
      .filter(v => v !== null);
    this.serviceForm.value.serviceId = selectedServiceNames;
    this.serviceForm.value.propertyId = this.route.snapshot.params['id'];
    this.propertyService.createServiceRequest(this.serviceForm.value).subscribe
      (
        data => {
          if (data && data['responseCode'] === 200) {
            this.iconText = "success";
            this.popupText = "Service request added successfully";
            this.openDialog(this.popupText, this.iconText);
            this.serviceForm.reset();
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

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.propertyService.getProperty(id)
      .subscribe
      (
        data => {
          if (data && data.responseCode === 200) {
            this.dataInfo = data.data;
            this.getServicesbyTypeId(this.dataInfo.propertyId);
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
      );

    this.propertyService.serviceRequestByStatus('CREATED').subscribe(
      data => {
        if (data && data['responseCode'] === 200) {
          this.serviceRequestHistory = data['data'];
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
    );
  }

  getServicesbyTypeId(typeId) {
    this.propertyService.getServicesbyTypeId(typeId).subscribe
      (
        data => {
          if (data && data['responseCode'] === 200) {
            this.servicesData = data['data'];
            this.addCheckboxes();
          }
        },
        err => {
          this.iconText = "error";
          if (err.status === 500) {
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
  openDialog(popupText, iconText) {
    Swal.fire({
      icon: iconText,
      title: popupText,
    });
  }
  imageUrls = [];
  onselect(e) {
    if (e.target.files) {
      for (let i = 0; i < File.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (events: any) => {
          this.imageUrls.push(events.target.result);
        };
      }
    }
  }

  addPhoto() {
    const dialogRef = this.dialog.open(AddPhotosComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
