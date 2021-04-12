import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then(m => m.EmailModule)
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./appointment/appointment.module').then(m => m.AppointmentModule)
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./doctors/doctors.module').then(m => m.DoctorsModule)
  },
  {
    path: 'staff',
    loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./patient/patient.module').then(m => m.PatientModule)
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'room',
    loadChildren: () => import('./room/room.module').then(m => m.RoomModule)
  },
  {
    path: 'apps',
    loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'widget',
    loadChildren: () =>
      import('./widget/widget.module').then(m => m.WidgetModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./ui/ui.module').then(m => m.UiModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'media',
    loadChildren: () => import('./media/media.module').then(m => m.MediaModule)
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./charts/charts.module').then(m => m.ChartsModule)
  },
  {
    path: 'timeline',
    loadChildren: () =>
      import('./timeline/timeline.module').then(m => m.TimelineModule)
  },
  {
    path: 'icons',
    loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        m => m.AuthenticationModule
      )
  },
  {
    path: 'extra-pages',
    loadChildren: () =>
      import('./extra-pages/extra-pages.module').then(m => m.ExtraPagesModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
  },
  {
    path: 'rentals',
    loadChildren: () => import('./rentals/rentals.module').then(m => m.RentalsModule)
  },
  {
    path: 'tenants',
    loadChildren: () => import('./tenant/tenants.module').then(m => m.TenantsModule)
  },
  {
    path: 'property',
    loadChildren: () => import('./property/property.module').then(m => m.PropertyModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'serviceProvider',
    loadChildren: () => import('./service-provider/service-provider.module').then(m => m.ServiceProviderModule)
  },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
