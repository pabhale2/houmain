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

  servicesData = [
    { name: 'Handyman', value: "Handyman" },
    { name: 'Carpentry/Furniture Assembly', value: "Carpentry/Furniture Assembly" },
    { name: 'Tiling', value: "Tiling" },
    { name: 'Plumbing', value: "Plumbing" },
    { name: 'Painting', value: "Painting" },
    { name: 'Gardens', value: "Gardens" },
    { name: 'Swimming Pool', value: "Swimming Pool" },
    { name: 'Elevators and Escalators', value: "Elevators and Escalators" },
    { name: 'Electrical', value: "Electrical" },
    { name: 'AC Services', value: "AC Services" },
    { name: 'House Cleaning', value: "House Cleaning" },
    { name: 'Furniture Cleaning', value: "Furniture Cleaning" },
    { name: 'Garden Cleaning', value: "Garden Cleaning" },
    { name: 'Deep Cleaning', value: "Deep Cleaning" },
    { name: 'Office Cleaning', value: "Office Cleaning" },
    { name: 'Water Tank Cleaning', value: "Water Tank Cleaning" },
    { name: 'AC Duct Cleaning', value: "AC Duct Cleaning" },
    { name: 'Odor Removal', value: "Odor Removal" },
    { name: 'Pest Control', value: "Pest Control" },
  ];
  serviceForm: FormGroup;
  container = new MatTableDataSource();
  displayedColumns = ["unit", "address", "tenant", "recentEvent"];
  public property = [];
  dialog: any;
  constructor(
    private propertyService: PropertyService,
    public http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.serviceForm = this.formBuilder.group({
      services: new FormArray([]),
      remark: String,
    });

    this.addCheckboxes();
  }
  dataInfo: any;
  iconText: string;
  popupText: string;
  length: number;
  pageIndex = 1;
  pageSize: number = 1;
  pageSizeOptions = [1, 5, 10, 50];

  get servicesFormArray() {
    return this.serviceForm.controls.services as FormArray;
  }

  private addCheckboxes() {
    this.servicesData.forEach(() => this.servicesFormArray.push(new FormControl(false)));
  }

  requestForService() {
    const selectedServiceNames = this.serviceForm.value.services
      .map((checked, i) => checked ? this.servicesData[i].name : null)
      .filter(v => v !== null);
    console.log(selectedServiceNames);
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.propertyService.getProperty(id)
      .subscribe
      (
        data => {
          if (data && data.responseCode === 200) {
            this.dataInfo = data.data;
            console.log(this.dataInfo);
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
