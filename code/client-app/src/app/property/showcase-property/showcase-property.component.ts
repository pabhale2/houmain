import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../property.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'showcase-property-list',
  templateUrl: './showcase-property.component.html',
  styleUrls: ['./showcase-property.component.sass']
})
export class ShowcasePropertyComponent implements OnInit {

  propertyList;
  
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public propertyService: PropertyService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private authenticationService: AuthenticationService
  ) {
    this.propertyList = [];
  }
  ngOnInit(){
    this.loadData();
  }
  ngAfterViewInit() {
  }
  refresh() {
  }
  public loadData() {
    this.propertyService.getUnSoldProperties().subscribe(
      result => {
        if(result && result['responseCode']==200) {
          var data = result['data']
          this.propertyList = result['data'];
        } else {

        } 
      }, 
      error =>{

      });
  }
  addProperty() {
    this.router.navigate(['rentals/addOwner']);
  }
  
  assignPropertyForInspection(event){
    console.log(event);
  }
}
