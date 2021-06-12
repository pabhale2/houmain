import { ServiceProviderService } from '../service-provider.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PropertyService } from 'src/app/property/property.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'vendor-service-assign',
  templateUrl: './vendor-services.component.html',
  styleUrls: ['./vendor-services.component.scss']
})
export class VendorServiceComponent implements OnInit,AfterViewInit {
  container=new MatTableDataSource();
  dataOwner: any;
  length: number;
  pageIndex=1;
  pageSize: number=10;
  pageSizeOptions = [10, 25, 50];
  iconText: string;
  popupText: string;

  displayedColumns = [
    'propertyId',
    'serviceName',
    'comment',
    'registerDate',
    'status',
    'action'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  manualPage: number;
  vendors;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public providerService: ServiceProviderService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private serviceProvider: ServiceProviderService,
    private propertyService: PropertyService,
    private tokenStorageService: TokenStorageService
  ) {
    this.vendors = [];
  }
  ngOnInit(){
    this.loadData();
  }
  ngAfterViewInit() {
    this.container.sort = this.sort;
    this.container.paginator = this.paginator;
    
  }
  refresh() {
    this.loadData();
  }
  private refreshTable(response) {
    this.container.data=response;
    console.log(response);
    this.length=this.container.data.length;
    
  }
  applyFilter(filterValue: string) {
    this.container.filter = filterValue.trim().toLowerCase();
  }
  public loadData() {
    let user = this.tokenStorageService.getUser();
    this.serviceProvider.getPrpertyAssignedToVendor(user.id).subscribe(
      data =>{
        this.refreshTable(data['data']);
        console.log(data);
        this.container.sort = this.sort;
        this.applyFilter('');
      }, error =>{

      }
    );
    
  }

  addOwner() {
    this.router.navigate(['rentals/addOwner']);
  }

  updateServiceStatus(row, event){
    row.serviceId = [row.service.id];
    row.status = event.target.value;
    this.propertyService.createServiceRequest(row).subscribe
        (
          data => {
            if (data && data['responseCode'] === 200) {
              this.iconText = "success";
              this.popupText = "Status Updated";
              this.openDialog(this.popupText, this.iconText);
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
}
