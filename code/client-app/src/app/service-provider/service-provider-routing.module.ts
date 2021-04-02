import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ListServiceComponent } from './list-services/list-services.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'listService',
    component: ListServiceComponent
  },
  {
    path: 'detailServiceInfo/:id',
    component: ServiceDetailComponent
  },
  {
    path: '',
    redirectTo: 'listService',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule {}
