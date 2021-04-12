import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-rental-User',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.sass']
})
export class UsersComponent implements OnInit, AfterViewInit {
  container = new MatTableDataSource();
  dataOwner: any;
  length: number;
  pageIndex = 1;
  pageSize: number = 5;
  pageSizeOptions = [1, 5, 10, 50];
  displayedColumns = [
    'firstName',
    'lastName',
    'mobile',
    'primaryEmail'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  manualPage: number;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public userService: UserService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.loadData();
  }
  ngAfterViewInit() {
    this.container.sort = this.sort;
    this.container.paginator = this.paginator;
    setTimeout(() => this.paginator.length = this.length);
  }
  refresh() {
    this.loadData();
  }
  private refreshTable(response) {
    let newResponse = [];
    response.data.forEach(function (element) {
      //Filter data based on requirement 
      if (element.roles.some(e => e.roleName != "OWNER") && element.roles.some(e => e.roleName != "TENANT") && element.roles.some(e => e.roleName != "VENDOR")) {
        newResponse.push(element);
      }
    });
    this.container.data = newResponse;
    this.length = this.container.data.length;
  }
  applyFilter(filterValue: string) {
    this.container.filter = filterValue.trim().toLowerCase();
  }
  public loadData() {
    this.userService.getAllUser().subscribe(response => this.refreshTable(response));
    this.container.sort = this.sort;
    this.applyFilter('');
    console.log(this.container);
  }
  addOwner() {

  }
}
