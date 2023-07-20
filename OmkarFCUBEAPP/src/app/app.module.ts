import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './module/login/login.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Loginmodel } from './models/loginmodel';
import { LayoutModule } from './module/shared';
import { Usermodel } from './models/usermodel';
import { Lrbillseriesmodel } from './models/lrbillseriesmodel';
import { Destinationmodel } from './models/destinationmodel';
import { Brandmastermodel } from './models/brandmastermodel';
import { Ratetypesmodel } from './models/ratetypesmodel';
import { Tyrepositionmastermodel } from './models/tyrepositionmastermodel';
import { Productgroupmastermodel } from './models/productgroupmastermodel';
import { Productmastermodel } from './models/productmastermodel';
import { DataTablesModule } from 'angular-datatables';
import { UserlistComponent } from './module/user/userlist/userlist.component';
import { UserdetailsComponent } from './module/user/userdetails/userdetails.component';
import { UseraddComponent } from './module/user/useradd/useradd.component';

import { AdddestinationComponent } from './module/destination/adddestination/adddestination.component';
import { DestinationdetailComponent } from './module/destination/destinationdetail/destinationdetail.component';
import { DestinationlistComponent } from './module/destination/destinationlist/destinationlist.component';
import { Ratetypeslistmodel } from './models/ratetypeslistmodel';
import { ProductgroupmasterlistComponent } from './module/productgroupmaster/productgroupmasterlist/productgroupmasterlist.component';
import { AddproductgroupmasterComponent } from './module/productgroupmaster/addproductgroupmaster/addproductgroupmaster.component';
import { ProductmasterlistComponent } from './module/productmaster/productmasterlist/productmasterlist.component';
import { AddproductmasterComponent } from './module/productmaster/addproductmaster/addproductmaster.component';
import { BrandmasterlistComponent } from './module/brandmaster/brandmasterlist/brandmasterlist.component';
import { AddbrandmasterComponent } from './module/brandmaster/addbrandmaster/addbrandmaster.component';
import { TyrepositionmasterlistComponent } from './module/tyrepositionmaster/tyrepositionmasterlist/tyrepositionmasterlist.component';
import { AddtyrepositionmasterComponent } from './module/tyrepositionmaster/addtyrepositionmaster/addtyrepositionmaster.component';
import { DocrenewalmasterlistComponent } from './module/docrenewalmaster/docrenewalmasterlist/docrenewalmasterlist.component';
import { AdddocrenewalmasterComponent } from './module/docrenewalmaster/adddocrenewalmaster/adddocrenewalmaster.component';
import { Docrenewalmastermodel } from './models/docrenewalmastermodel';
import { Docrenewalentrymodel } from './models/docrenewalentrymodel';


import { RatetypeslistComponent } from './module/ratetypes/ratetypeslist/ratetypeslist.component';
import { AddratetypesComponent } from './module/ratetypes/addratetypes/addratetypes.component';
import { LrbillserieslistComponent } from './module/lrbillseries/lrbillserieslist/lrbillserieslist.component';
import { AddlrbillseriesComponent } from './module/lrbillseries/addlrbillseries/addlrbillseries.component';
import { VehicletypemasterlistComponent } from './module/vehicletypemaster/vehicletypemasterlist/vehicletypemasterlist.component';
import { AddvehicletypemasterComponent } from './module/vehicletypemaster/addvehicletypemaster/addvehicletypemaster.component';
import { Vehicletypemastermodel } from './models/vehicletypemastermodel';

import { Vehicletypegroupmastermodel } from './models/vehicletypegroupmastermodel';

import { VehicletypegroupmasterlistComponent } from './module/vehicletypegroupmaster/vehicletypegroupmasterlist/vehicletypegroupmasterlist.component';
import { AddvehicletypegroupmasterComponent } from './module/vehicletypegroupmaster/addvehicletypegroupmaster/addvehicletypegroupmaster.component';
import { GstdetailsComponent } from './module/gstdetails/gstdetails.component';
import { ConfirmationdialogComponent } from './module/shared/confirmationdialog/confirmationdialog.component';
import { ConsignmentaddComponent } from './module/consignment/consignmentadd/consignmentadd.component';
import { ConsignmentlistComponent } from './module/consignment/consignmentlist/consignmentlist.component';

import { Consignmentmodel } from './models/consignmentmodel';
import { Trippaymentsmodel } from './models/trippaymentsmodel';
import { AddbranchmasterComponent } from './module/branchmaster/addbranchmaster/addbranchmaster.component';
import { BranchmasterlistComponent } from './module/branchmaster/branchmasterlist/branchmasterlist.component';
import { Branchmodel } from './models/branchmodel';
import { Cnorcneemastermodel } from './models/cnorcneemastermodel';
import { VehiclemasteraddComponent } from './module/vehiclemaster/vehiclemasteradd/vehiclemasteradd.component';
import { VehiclemasterlistComponent } from './module/vehiclemaster/vehiclemasterlist/vehiclemasterlist.component';
import { Vehiclefltmastermodel } from './models/vehiclefltmastermodel';
import { ListcnorcneemasterComponent } from './module/cnorcneemaster/listcnorcneemaster/listcnorcneemaster.component';
import { AddcnorcneemasterComponent } from './module/cnorcneemaster/addcnorcneemaster/addcnorcneemaster.component';
import { DrivermasteraddComponent } from './module/drivermaster/drivermasteradd/drivermasteradd.component';
import { DrivermasterlistComponent } from './module/drivermaster/drivermasterlist/drivermasterlist.component';
import { AddtrippaymentsComponent } from './module/trippayments/addtrippayments/addtrippayments.component';
import { TrippaymentslistComponent } from './module/trippayments/trippaymentslist/trippaymentslist.component';
import { GstpurchaseaddComponent } from './module/gstpurchase/gstpurchaseadd/gstpurchaseadd.component';
import { GstpurchaselistComponent } from './module/gstpurchase/gstpurchaselist/gstpurchaselist.component';
import { Drivermodel } from './models/drivermodel';

import { AdddocrenewalentryComponent } from './module/docrenewalentry/adddocrenewalentry/adddocrenewalentry.component';
import { DocrenewalentrylistComponent } from './module/docrenewalentry/docrenewalentrylist/docrenewalentrylist.component';
import { CashreceiptentrylistComponent } from './module/cashreceiptentry/cashreceiptentrylist/cashreceiptentrylist.component';
import { AddcashreceiptentryComponent } from './module/cashreceiptentry/addcashreceiptentry/addcashreceiptentry.component';

import { IntermediatescreenComponent } from './module/intermediatescreen/intermediatescreen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UseraddComponent,
    UserlistComponent,
    UserdetailsComponent,
    AdddestinationComponent,
    DestinationdetailComponent,
    DestinationlistComponent,
    ProductgroupmasterlistComponent,
    AddproductgroupmasterComponent,
    ProductmasterlistComponent,
    AddproductmasterComponent,
    BrandmasterlistComponent,
    AddbrandmasterComponent,
    TyrepositionmasterlistComponent,
    AddtyrepositionmasterComponent,
    DocrenewalmasterlistComponent,
    AdddocrenewalmasterComponent,
  
    RatetypeslistComponent,
    AddratetypesComponent,
    LrbillserieslistComponent,
    AddlrbillseriesComponent,
    VehicletypemasterlistComponent,
    AddvehicletypemasterComponent,
    VehicletypegroupmasterlistComponent,
    AddvehicletypegroupmasterComponent,
    GstdetailsComponent,
    ConfirmationdialogComponent,
    ConsignmentaddComponent,
    ConsignmentlistComponent,
    AddbranchmasterComponent,
    BranchmasterlistComponent,
    VehiclemasteraddComponent,
    VehiclemasterlistComponent,
    ListcnorcneemasterComponent,
    AddcnorcneemasterComponent,
    DrivermasteraddComponent,
    DrivermasterlistComponent,
    AddtrippaymentsComponent,
    TrippaymentslistComponent,
    GstpurchaseaddComponent,
    GstpurchaselistComponent,

    AdddocrenewalentryComponent,
    DocrenewalentrylistComponent,
    CashreceiptentrylistComponent,
    AddcashreceiptentryComponent,
 
    IntermediatescreenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 30000, // 30 seconds
      closeButton: true,
      progressBar: true,
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    LayoutModule
  ],
    providers: [Loginmodel, Usermodel, Destinationmodel, Productgroupmastermodel, Productmastermodel, Brandmastermodel, Tyrepositionmastermodel, Docrenewalmastermodel, Ratetypesmodel, Lrbillseriesmodel, Vehicletypemastermodel, Vehicletypegroupmastermodel, Consignmentmodel, Branchmodel, Vehiclefltmastermodel, Cnorcneemastermodel, Trippaymentsmodel, Drivermodel, Docrenewalmastermodel, Docrenewalentrymodel
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
