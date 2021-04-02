import { ServiceProviderService } from './../service-provider.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-rental-owners',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.sass']
})
export class ListServiceComponent implements OnInit,AfterViewInit {
  container=new MatTableDataSource();
  dataOwner: any;
  length: number;
  pageIndex=1;
  pageSize: number=1;
  pageSizeOptions = [1, 5, 10, 50];

  displayedColumns = [
    'fullName',
    'serviceDate',
    'address',
    'mobile',
    'serviceType',
    'status'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  manualPage: number;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public providerService: ServiceProviderService,
    private router: Router,
  ) {}
  ngOnInit(){
    this.loadData();
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
    this.container.data=response;
    this.length=this.container.data.length;
    console.log(this.container);
  }
  applyFilter(filterValue: string) {
    this.container.filter = filterValue.trim().toLowerCase();
  }
  public loadData() {
    this.refreshTable(this.providerService.getAllService());
    this.container.sort = this.sort;
    this.applyFilter('');
  }
  addOwner() {
    this.router.navigate(['rentals/addOwner']);
  }
}
