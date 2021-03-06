import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./showcase-property.component.scss']
})
export class ShowcasePropertyComponent implements OnInit {

  propertyList;
  user;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private authenticationService: AuthenticationService
  ) {
    this.user = {};
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
  
  bookProperty(property){
    console.log(property);
  }

  redirectToProperty(property) {
    this.router.navigate(['property/displayPropertyInfo/'+property['propertyId']]);
  }
}
