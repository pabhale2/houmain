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

@Component({
  selector: "app-view-property",
  templateUrl: "./view-property.component.html",
  styleUrls: ["./view-property.component.sass"],
})
export class ViewPropertyComponent implements OnInit {
  container = new MatTableDataSource();
  displayedColumns = ["unit", "address", "tenant", "recentEvent"];
  public property = [];
  constructor(
    private propertyService: PropertyService,
    public http: HttpClient,
    private route: ActivatedRoute
  ) {}

  dataInfo: any;
  iconText: string;
  popupText: string;
  length: number;
  pageIndex = 1;
  pageSize: number = 1;
  pageSizeOptions = [1, 5, 10, 50];

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.propertyService.getProperty(id)
    .subscribe
    (
      data =>
      {
        if(data && data.responseCode === 200){
          this.dataInfo = data.data;
          console.log(this.dataInfo);
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
  openDialog(popupText,iconText){
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
}
