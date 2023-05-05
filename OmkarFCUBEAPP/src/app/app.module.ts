import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './module/login/login.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Loginmodel } from './models/loginmodel';
import { LayoutModule } from './module/shared';
import { Usermodel } from './models/usermodel';
import { DataTablesModule } from 'angular-datatables';
import { UserlistComponent } from './module/user/userlist/userlist.component';
import { UserdetailsComponent } from './module/user/userdetails/userdetails.component';
import { UseraddComponent } from './module/user/useradd/useradd.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UseraddComponent,
    UserlistComponent,
    UserdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    LayoutModule
  ],
  providers: [Loginmodel, Usermodel],
  bootstrap: [AppComponent]
})
export class AppModule { }
