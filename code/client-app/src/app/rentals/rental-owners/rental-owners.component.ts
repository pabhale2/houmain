import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwnersService } from '../owners.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-rental-owners',
  templateUrl: './rental-owners.component.html',
  styleUrls: ['./rental-owners.component.sass']
})
export class RentalOwnersComponent implements OnInit,AfterViewInit {
  container=new MatTableDataSource();
  dataOwner: any;
  length: number;
  pageIndex=1;
  pageSize: number=5;
  pageSizeOptions = [1, 5, 10, 50];

  displayedColumns = [
    'firstName',
    'lastName',
    'address',
    'mobile',
    'primaryEmail'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  manualPage: number;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public ownersService: OwnersService,
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
    this.length=this.container.data.length;
  }
  applyFilter(filterValue: string) {
    this.container.filter = filterValue.trim().toLowerCase();
  }
  public loadData() {
    this.ownersService.getAllOwners().subscribe(response=>this.refreshTable(response));
    this.container.sort = this.sort;
    this.applyFilter('');
    
  }
  addOwner() {

  }
}
