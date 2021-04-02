import { ServiceProviderService } from './../service-provider.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.sass']
})
export class ServiceDetailComponent implements OnInit {

  constructor(private providersService:ServiceProviderService, public http:HttpClient, private route: ActivatedRoute) { }

  dataInfo:any;
  iconText: string;
  popupText: string;

  ngOnInit(){
    const id = +this.route.snapshot.params['id'];
    this.dataInfo = this.providersService.getServiceDetail()
    console.log(this.dataInfo);
}
openDialog(popupText,iconText){
  Swal.fire({
    icon: iconText,
    title: popupText,
  });
}

}
