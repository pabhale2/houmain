import { ViewPropertyListComponent } from './view-property-list/view-property-list.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { PropertyRoutingModule } from './property-routing.module';
import { AddPhotosComponent } from './add-photos/add-photos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyComponent } from './add-property/add-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';

import { EditPropertyComponent } from './edit-property/edit-property.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { RentPricePredictionComponent } from './rent-price-prediction/rent-price-prediction.component';


@NgModule({
  declarations: [
    ViewPropertyComponent ,EditPropertyComponent,ViewPropertyListComponent,AddPropertyComponent,AddPhotosComponent, RentPricePredictionComponent
   ],

  imports: [
    MatTabsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvXMDEZNJpSIdP7Fq8I9gyRxY-yDdkyoE'
    }),
    PropertyRoutingModule
  ]
})
export class PropertyModule { }
