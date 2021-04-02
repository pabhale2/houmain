import { Component, OnInit } from '@angular/core';
import {OwnersService} from '../owners.service';
import { HttpClient } from '@angular/common/http';
import { Owners } from '../owners.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-info-owner',
  templateUrl: './display-info-owner.component.html',
  styleUrls: ['./display-info-owner.component.sass']
})
export class DisplayInfoOwnerComponent implements OnInit{
  constructor(  private ownerService:OwnersService, public http:HttpClient, private route: ActivatedRoute) {}

  dataInfo:any;
  iconText: string;
  popupText: string;

  ngOnInit(){
    const id = +this.route.snapshot.params['id'];
    this.ownerService.getOwner(id)
    .subscribe
    (
      data =>
      {
        if(data && data.responseCode === 200)
          this.dataInfo = data.data;
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
}


