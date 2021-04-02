import { RentPricePredictionComponent } from './rent-price-prediction/rent-price-prediction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { ViewPropertyListComponent } from './view-property-list/view-property-list.component';

const routes: Routes = [
  {
    path: 'addProperty',
    component: AddPropertyComponent
  },
  { 
    path: 'displayPropertyInfo/:id',
    component: ViewPropertyComponent
  },
  {
    path: '',
    component: EditPropertyComponent
  },
  {
    path: '',
    redirectTo: 'addProperty',
    pathMatch: 'full'
  },
  {
    path: 'viewPropertyList',
    component: ViewPropertyListComponent
  },
  {
    path: 'rentPrediction',
    component: RentPricePredictionComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule {}
