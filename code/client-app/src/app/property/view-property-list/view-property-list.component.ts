import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../property.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
@Component({
  selector: 'app-view-property-list',
  templateUrl: './view-property-list.component.html',
  styleUrls: ['./view-property-list.component.scss']
})
export class ViewPropertyListComponent implements OnInit {

  container=new MatTableDataSource();
  dataOwner: any;
  length: number;
  pageIndex=1;
  pageSize: number=10;
  pageSizeOptions = [10, 25, 50];
  
  propertyList : any[];

  displayedColumns = [
    'propertyName',
    'ownerName',
    'propertyAddress',
    'mobile',
    'actions'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  manualPage: number;
  user: any;
  userRole: string;
  popupText: string;
  openDialog: any;
  iconText: any;
  allInspectors: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public propertyService: PropertyService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit(){
    this.loadData();
    this.user = this.tokenStorageService.getUser();
    if(this.user.roles.some(e => e.roleName === "ADMIN_USER")){
      this.userRole="ADMIN_USER";
    }
    else if(this.user.roles.some(e => e.roleName === "INSPECTOR")){
      this.userRole="INSPECTOR";
    }
    else{
      this.userRole="USER";
    }
    this.getAllInspectors();
  }
  ngAfterViewInit() {
    this.container.sort = this.sort;
    this.container.paginator = this.paginator;
    setTimeout(()=>this.paginator.length = this.length);
  }
  refresh() {
    this.loadData();
  }
  private refreshTable(response) {
    this.container.data=response.data;
    this.length=this.container.data.length;
  }
  applyFilter(filterValue: string) {
    this.container.filter = filterValue.trim().toLowerCase();
  }
  public loadData() {
    this.propertyService.getAllProperty(((this.pageIndex*this.pageSize) - this.pageSize), this.pageSize).subscribe(response=>this.refreshTable(response));
    this.container.sort = this.sort;
    this.applyFilter('');
  }
  addProperty() {
    this.router.navigate(['rentals/addOwner']);
  }
  
  getAllInspectors(){
    this.authenticationService.getUsersByRole('INSPECTOR').subscribe(response=>this.allInspectors=response);
  }

  assignPropertyForInspection(event){
    console.log(event);
  }
}
