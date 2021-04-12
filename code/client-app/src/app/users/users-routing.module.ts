import { EditUserComponent } from './edit-user/edit-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './show-users/show-users.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path: 'showUsers',
    component: UsersComponent
  },
  {
    path: 'addUser',
    component: AddUserComponent
  },
  {
    path: 'editUser/:id',
    component: EditUserComponent
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
export class UsersRoutingModule { }
