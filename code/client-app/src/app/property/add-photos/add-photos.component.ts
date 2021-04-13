import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PropertyServiceService } from './../property-service.service';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.scss']
})
export class AddPhotosComponent implements OnInit {
  PropertyPhotoCategory:any;
  addPropertyGallary: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddPhotosComponent>,
    private propertyService: PropertyServiceService,private fb: FormBuilder, private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.loadData();
    }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.addPropertyGallary = this.fb.group({
      photoCategory: ['', Validators.required],
      files:['',Validators.required],
      fileSource:['',Validators.required]
    })
  }
  openDialog(popupText,iconText){
    Swal.fire({
    icon: popupText,
    title: iconText,
    });
}
  images=[];
  onselect(event)
  {
    if (event.target.files && event.target.files[0] && this.images.length+event.target.files.length<10) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
               reader.onload = (event:any) => {
                 this.images.push(event.target.result); 
                 this.addPropertyGallary.patchValue({
                    fileSource: this.images
                 });
              }
              reader.readAsDataURL(event.target.files[i]);
      }
  }  else{
    this.openDialog("error","You can only add 10 images");
}
  }
uploadImage(){
  console.log(this.addPropertyGallary.value);
  this.dialogRef.close("success");
}
  loadData(){
    this.PropertyPhotoCategory=this.propertyService.getPropertyPhotoCategory();
}
private deleteImage(url: any): void {
  this.images = this.images.filter((a) => a !== url);
}

}
