import { DisplayInfoTenantComponent } from './display-info-tenant/display-info-tenant.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RentalsRoutingModule } from './tenants-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tenantsComponent } from './show-tenants/show-tenants.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AddTenantComponent } from './add-tenant/add-tenant.component';
import { EditTenantComponent } from './edit-tenant/edit-tenant.component';

@NgModule({
  declarations: [
    tenantsComponent,
    DisplayInfoTenantComponent,
    AddTenantComponent,
    EditTenantComponent],
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
    RentalsRoutingModule
  ]
})
export class TenantsModule { }
