import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { LoginComponent } from './module/login/login.component';
import { UserlistComponent } from './module/user/userlist/userlist.component';
import { UseraddComponent } from './module/user/useradd/useradd.component';
import { UserdetailsComponent } from './module/user/userdetails/userdetails.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'useradd', component: UseraddComponent },
  { path: 'useredit', component: UseraddComponent },
  { path: 'userdetails', component: UserdetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
