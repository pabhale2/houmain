import { AddPhotosComponent } from './../add-photos/add-photos.component';
import { PropertyServiceService } from './../property-service.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PropertyService } from '../property.service';

interface PropertyType{
  viewValue: string;
}

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.sass']
})
export class AddPropertyComponent implements OnInit {
  iconText: string;
  popupText: string;
  propertyUnit: FormArray;
 

  constructor( public proService: PropertyService,
    private fb: FormBuilder, private http: HttpClient,
    private propertyService: PropertyServiceService,public dialog: MatDialog) {
      this.propertyTypeData=this.propertyService.getPropertyType();
     }

  latitude: 19.997454;
  longitude: 73.789803;
  address;
  dataInfo:any;
  container=new MatTableDataSource();  
  propertyTypeData :any;
  PropertySubTypeData:any;
  PropertyPhotoCategory:any;
  addPropertyForm: FormGroup;
  addPropertyGallary: FormGroup;
  displayedColumns = [
    'Photo Type',
    'Photos',
  ];
  public errormessage={
    propertyType: [
      {type : 'required' , message: 'Property Type required'},
      {type : 'pattern' , message: 'Property Type is not valid'},
    ],
    propertySubType: [
      {type : 'required' , message: 'Property Subtype required'},
      {type : 'pattern' , message: 'Property subtype is not valid'},
    ],
    propertDescription: [
      {type : 'maxLength' , message: 'Property Description must be less than 1000 words'},
      {type : 'required' , message: 'Property Description required'},
    ],
    propertyName: [
      {type : 'maxLength' , message: 'Property Name must be less than 200 words'},
      {type : 'required' , message: 'Property Name required'},
    ],
    streetAddress: [
      {type : 'maxLength' , message: 'street address must be less than 500 words'},
    ],
    city: [
      {type : 'pattern' , message: 'Name of the city must be less than 50 words'},
    ],
    state: [
      {type : 'pattern' , message: 'Name of the state must be less than 50 words'},
    ],
    zip: [
      {type : 'pattern' , message: 'zip is not valid'},
    ],
    country: [
      {type : 'pattern' , message: 'Name of the Country must be less than 100 words'},
    ],
    lastName: [
      {type : 'required' , message: 'Last Name required'},
      {type : 'pattern' , message: 'Last Name is not valid'},
    ],
    companyName: [
      {type : 'pattern' , message: 'school Name is not valid'},
    ],
    primaryEmail: [
      {type : 'required' , message: 'Primary Email required'},
      {type : 'pattern' , message: 'Primary Email is not valid'},
    ],
    alternateEmail: [
      {type : 'pattern' , message: 'Alternate Email is not valid'},
    ],
    mobile: [
      {type : 'pattern' , message: 'Mobile number is not valid'},
    ],
    homeNumber: [
      {type : 'pattern' , message: 'Home Number is not valid'},
    ],
    officeNumber: [
      {type : 'pattern' , message: 'Office Number is not valid'},
    ],
    number: [
      {type : 'pattern' , message: 'Number is not valid'},
    ],
    comments: [
      {type : 'pattern' , message: 'comment must be less than 250 words'},
    ],
    taxpayerID: [
      {type : 'pattern' , message: 'Taxpayers ID is not valid'},
    ],
    taxIndentityType: [
      {type : 'pattern' , message: 'Tax identity type  is not valid'},
    ],
    GalleriesNum: [
      {type : 'pattern' , message: 'number of gallary is no valid'},
    ],
    unitCount: [
      {type : 'pattern' , message: 'unit Count is no valid'},
    ],
    KitchenNum: [
      {type : 'pattern' , message: 'number of Kitchen is not valid'},
    ],
    BathroomNum: [
      {type : 'pattern' , message: 'number of Bathroom is not valid'},
    ],
    ToiletNum: [
      {type : 'pattern' , message: 'number of Toilet is not valid'},
    ],
    EntryGateNum: [
      {type : 'pattern' , message: 'number of EntryGate is not valid'},
    ],
    HallNum: [
      {type : 'pattern' , message: 'number of Hall is not valid'},
    ],
    BedNum: [
      {type : 'pattern'||'maxLength' , message: 'number of Bed is not valid'},
    ],
    OtherInfo: [
      {type : 'pattern' , message: 'other info is not valid'},
    ],
  };

 

  ngOnInit(): void {
    this.initForm();
  }
  loadData(newvalue){
    this.PropertySubTypeData=this.propertyService.getPropertySubType(newvalue);
   // this.PropertyPhotoCategory=this.propertyService.getPropertyPhotoCategory(newvalue);
}
  initForm(){
    this.addPropertyForm = this.fb.group({
      propertDescription: ['New & furnished',[Validators.maxLength(1000),Validators.required] ],
      propertyName: ['Mukund Nivas',[ Validators.required,Validators.maxLength(200)]],
      propertyType: ['', [Validators.required]],
      propertySubType: ['', [Validators.required]],
      streetAddress: ['Bhanwaj road', [Validators.maxLength(100)]],
      city: ['Khopoli', [Validators.required, Validators.pattern("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$")]],
      state: ['Maharastra', [Validators.required, Validators.pattern("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$")]],
      zip: ['410203', [Validators.required]],
      country: ['India', [Validators.required, Validators.pattern]],
      unitCount:['2', [ Validators.pattern("[0-9]{1,2}")]],
      HallNum:  ['2', [ Validators.pattern("[0-9]{1,2}")]],
      BedNum: ['2', [ Validators.pattern("[0-9]{1,2}")]],
      GalleriesNum: ['2', [ Validators.pattern("[0-9]{1,2}")]],
      KitchenNum:['2', [ Validators.pattern("[0-9]{1,2}")]],
      BathroomNum:['2', [Validators.pattern("[0-9]{1,2}")]],
      ToiletNum:['2', [ Validators.pattern("[0-9]{1,2}")]],
      EntryGateNum: ['2', [Validators.pattern("[0-9]{1,2}")]],
      OtherInfo: ['2', [ Validators.pattern("[0-9]{1,2}")]],
      propertyUnit: this.fb.array([ this.createPropertyUnit() ])
    })

    this.addPropertyGallary = this.fb.group({
      photoCategory: ['', Validators.required],
      photoUrls:['',Validators.required]
    })
  }

  createPropertyUnit(): FormGroup {
    return this.fb.group({
      unit:'',
      typeId: '',
      address:'',
      bed:'',
      gallary:'',
      bath:'',
      squareFeet:'',
      carpetArea:''
    });
  }

  addPropertyUnit(): void {
    this.propertyUnit = this.addPropertyForm.get('propertyUnit') as FormArray;
    this.propertyUnit.push(this.createPropertyUnit());
  }

  onSubmit(){
      this.addPropertyForm.value['typeId'] = this.addPropertyForm.value['propertyType'];
      this.proService.addProperty(this.addPropertyForm.value).subscribe(
      data => {
        this.iconText="success";
        this.popupText=" User added successfully";
        this.openDialog(this.popupText,this.iconText);
        this.addPropertyForm.reset();
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
    );
  }
  onPhotoUpload(){
    
    console.log(this.addPropertyGallary.value);
  }
  openDialog(popupText,iconText){
    Swal.fire({
    icon: popupText,
    title: iconText,
    });
}
  onMapClick(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    let mode = "retrieveAddresses";
    let maxResult = "1";
    const key = 'AIzaSyAvXMDEZNJpSIdP7Fq8I9gyRxY-yDdkyoE';
    let url = `https://maps/googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${key}`;
    https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyBXcUDeW6sZDMVl9zj_kWEK6pR06AOj1iY

    this.http.get(url)
    .subscribe((results:any) => {
      //console.log(results);
      // this.address = results.Response.View[0].Result[0].Location.Address.Label;
      // console.log(this.address);
    })
  }
  imageUrls=new Array<string>();
  onselect(e)
  {
    if(e.target.files && this.imageUrls.length+e.target.files.length<10){
      for(let i=0;i<e.target.files.length;i++){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload=(events:any)=>{
          this.imageUrls.push(events.target.result);
          this.addPropertyGallary.patchValue({

            fileSource: this.imageUrls

         });
        }
      }
    }
    else{
      this.openDialog("error","You can only add 10 images");
  }
} 
  private deleteImage(url: any): void {
    this.imageUrls = this.imageUrls.filter((a) => a !== url);
    this.addPropertyGallary.patchValue({
      fileSource: this.imageUrls
   });
}
addPhoto() {
  const dialogRef = this.dialog.open(AddPhotosComponent, {
        height: '400px',
      width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
