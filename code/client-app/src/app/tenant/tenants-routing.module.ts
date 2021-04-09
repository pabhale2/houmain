import { EditTenantComponent } from './edit-tenant/edit-tenant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayInfoTenantComponent } from './display-info-tenant/display-info-tenant.component';

import { tenantsComponent } from './show-tenants/show-tenants.component';
import { AddTenantComponent} from './add-tenant/add-tenant.component';

const routes: Routes = [
  {
    path: 'displayTenantInfo/:id',
    component: DisplayInfoTenantComponent
  },
  {
    path: 'showTenants',
    component: tenantsComponent
  },
  {
    path: 'addTenant',
    component: AddTenantComponent
  },
  {
    path: 'editTenant/:id',
    component: EditTenantComponent
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
