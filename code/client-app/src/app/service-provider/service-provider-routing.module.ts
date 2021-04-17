import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignServiceComponent } from './assign-services/assign-services.component';
import { VendorServiceComponent } from './vendor-services/vendor-services.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'assign-services',
    pathMatch: 'full'
  },
  {
    path: 'vendor-service',
    component: VendorServiceComponent
  },
  {
    path: 'assign-services',
    component: AssignServiceComponent
  },
  {
    path: 'detailServiceInfo/:id',
    component: ServiceDetailComponent
  },
  {
    path: 'assign-services',
    component: AssignServiceComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule {}
