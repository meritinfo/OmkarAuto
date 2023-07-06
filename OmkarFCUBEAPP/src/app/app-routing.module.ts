import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { LoginComponent } from './module/login/login.component';
import { UserlistComponent } from './module/user/userlist/userlist.component';
import { UseraddComponent } from './module/user/useradd/useradd.component';
import { UserdetailsComponent } from './module/user/userdetails/userdetails.component';
import { AdddestinationComponent } from './module/destination/adddestination/adddestination.component';
import { DestinationlistComponent } from './module/destination/destinationlist/destinationlist.component';
import { ProductgroupmasterlistComponent } from './module/productgroupmaster/productgroupmasterlist/productgroupmasterlist.component';
import { AddproductgroupmasterComponent } from './module/productgroupmaster/addproductgroupmaster/addproductgroupmaster.component';
import { ProductmasterlistComponent } from './module/productmaster/productmasterlist/productmasterlist.component';
import { AddproductmasterComponent } from './module/productmaster/addproductmaster/addproductmaster.component';
import { AddbrandmasterComponent } from './module/brandmaster/addbrandmaster/addbrandmaster.component';
import { BrandmasterlistComponent } from './module/brandmaster/brandmasterlist/brandmasterlist.component';
import { TyrepositionmasterlistComponent } from './module/tyrepositionmaster/tyrepositionmasterlist/tyrepositionmasterlist.component';
import { AddtyrepositionmasterComponent } from './module/tyrepositionmaster/addtyrepositionmaster/addtyrepositionmaster.component';
import { DocrenewalmasterlistComponent } from './module/docrenewalmaster/docrenewalmasterlist/docrenewalmasterlist.component';
import { AdddocrenewalmasterComponent } from './module/docrenewalmaster/adddocrenewalmaster/adddocrenewalmaster.component';
import { RatetypeslistComponent } from './module/ratetypes/ratetypeslist/ratetypeslist.component';
import { AddratetypesComponent } from './module/ratetypes/addratetypes/addratetypes.component';
import { AddlrbillseriesComponent } from './module/lrbillseries/addlrbillseries/addlrbillseries.component';
import { LrbillserieslistComponent } from './module/lrbillseries/lrbillserieslist/lrbillserieslist.component';
import {AddvehicletypemasterComponent} from './module/vehicletypemaster/addvehicletypemaster/addvehicletypemaster.component';
import {AddvehicletypegroupmasterComponent} from './module/vehicletypegroupmaster/addvehicletypegroupmaster/addvehicletypegroupmaster.component';

import { VehicletypemasterlistComponent } from './module/vehicletypemaster/vehicletypemasterlist/vehicletypemasterlist.component';
import { VehicletypegroupmasterlistComponent } from './module/vehicletypegroupmaster/vehicletypegroupmasterlist/vehicletypegroupmasterlist.component';
import { GstdetailsComponent } from './module/gstdetails/gstdetails.component';
import { ConsignmentlistComponent } from './module/consignment/consignmentlist/consignmentlist.component';
import { ConsignmentaddComponent } from './module/consignment/consignmentadd/consignmentadd.component';
import { BranchmasterlistComponent } from './module/branchmaster/branchmasterlist/branchmasterlist.component';
import { AddbranchmasterComponent } from './module/branchmaster/addbranchmaster/addbranchmaster.component';
import { VehiclemasterlistComponent } from './module/vehiclemaster/vehiclemasterlist/vehiclemasterlist.component';
import { VehiclemasteraddComponent } from './module/vehiclemaster/vehiclemasteradd/vehiclemasteradd.component';
import { DrivermasterlistComponent } from './module/drivermaster/drivermasterlist/drivermasterlist.component';
import { DrivermasteraddComponent } from './module/drivermaster/drivermasteradd/drivermasteradd.component';






const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'useradd', component: UseraddComponent },
  { path: 'useredit', component: UseraddComponent },
  { path: 'userdetails', component: UserdetailsComponent },
  { path: 'adddestination', component: AdddestinationComponent },
  { path: 'destinationedit', component: AdddestinationComponent },

  { path: 'destinationlist', component: DestinationlistComponent },
  { path: 'productgroupmasterlist', component: ProductgroupmasterlistComponent },
  { path: 'addproductgroupmaster', component: AddproductgroupmasterComponent },
  { path: 'addproductmaster', component: AddproductmasterComponent },
  { path: 'productgroupmasteredit', component: AddproductgroupmasterComponent },
  { path: 'productmasteredit', component: AddproductmasterComponent },
  { path: 'productmasterlist', component: ProductmasterlistComponent },
  { path: 'brandmasterlist', component: BrandmasterlistComponent },
  { path: 'addbrandmaster', component: AddbrandmasterComponent },
  { path: 'brandmasteredit', component: AddbrandmasterComponent },
  { path: 'tyrepositionmasterlist', component: TyrepositionmasterlistComponent },
  { path: 'addtyrepositionmaster', component: AddtyrepositionmasterComponent },
  { path: 'tyrepositionmasteredit', component: AddtyrepositionmasterComponent  },
  { path: 'adddocrenewalmaster', component: AdddocrenewalmasterComponent },
  { path: 'docrenewalmasteredit', component: AdddocrenewalmasterComponent },
  { path: 'docrenewalmasterlist', component: DocrenewalmasterlistComponent },
  { path: 'addratetypes', component: AddratetypesComponent },
  { path: 'ratetypesedit', component: AddratetypesComponent },
  { path: 'ratetypeslist', component: RatetypeslistComponent },
  { path: 'addlrbillseries', component: AddlrbillseriesComponent },
  { path: 'lrbillseriesedit', component: AddlrbillseriesComponent },
  { path: 'lrbillserieslist', component: LrbillserieslistComponent },
  { path: 'addvehicletypemaster', component: AddvehicletypemasterComponent },
  { path: 'addvehicletypegroupmaster', component: AddvehicletypegroupmasterComponent },
  { path: 'vehicletypemasteredit', component: AddvehicletypemasterComponent },
  { path: 'vehicletypegroupmasteredit', component: AddvehicletypegroupmasterComponent },
  { path: 'vehicletypemasterlist', component: VehicletypemasterlistComponent },
  { path: 'vehicletypegroupmasterlist', component: VehicletypegroupmasterlistComponent },
  { path: 'gstdetails', component: GstdetailsComponent },
  { path: 'consignmentlist', component: ConsignmentlistComponent },
  { path: 'consignmentadd', component: ConsignmentaddComponent },
  { path: 'consignmentedit', component: ConsignmentaddComponent },
  { path: 'branchmasterlist', component: BranchmasterlistComponent },
  { path: 'addbranchmaster', component: AddbranchmasterComponent },
  { path: 'branchmasteredit', component: AddbranchmasterComponent },
  { path: 'vehiclemasterlist', component: VehiclemasterlistComponent },
  { path: 'vehiclemasteradd', component: VehiclemasteraddComponent },
  { path: 'drivermasterlist', component: DrivermasterlistComponent },
  { path: 'drivermasteradd', component: DrivermasteraddComponent },
  
  
 
 

 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
