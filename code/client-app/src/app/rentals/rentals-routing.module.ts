import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayInfoOwnerComponent } from './display-info-owner/display-info-owner.component';

import { RentalOwnersComponent } from './rental-owners/rental-owners.component';
import { AddOwnerComponent} from './add-owner/add-owner.component';

const routes: Routes = [
  {
    path: 'displayOwnerInfo/:id',
    component: DisplayInfoOwnerComponent
  },
  {
    path: 'rentalowners',
    component: RentalOwnersComponent
  },
  {
    path: 'addOwner',
    component: AddOwnerComponent
  },
  {
    path: 'editOwner/:id',
    component: EditOwnerComponent
  },
  {
    path: '',
    redirectTo: 'rentalowners',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalsRoutingModule {}
