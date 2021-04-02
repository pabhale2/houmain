import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../property.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-view-property-list',
  templateUrl: './view-property-list.component.html',
  styleUrls: ['./view-property-list.component.sass']
})
export class ViewPropertyListComponent implements OnInit {

  container=new MatTableDataSource();
  dataOwner: any;
  length: number;
  pageIndex=1;
  pageSize: number=1;
  pageSizeOptions = [1, 5, 10, 50];
  
  propertyList : any[];

  displayedColumns = [
    'propertyName',
    'ownerName',
    'propertyAddress',
    'mobile'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  manualPage: number;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public propertyService: PropertyService,
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
    this.container.data=response.data;
    console.log(this.container);
    this.length=this.container.data.length;
  }
  applyFilter(filterValue: string) {
    this.container.filter = filterValue.trim().toLowerCase();
  }
  public loadData() {
    this.propertyService.getAllProperty().subscribe(response=>this.refreshTable(response));
    this.container.sort = this.sort;
    this.applyFilter('');
  }
  addProperty() {
    this.router.navigate(['rentals/addOwner']);
  }
}
