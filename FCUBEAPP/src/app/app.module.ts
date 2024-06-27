import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './module/login/login.component';
import {Maintanencemastermodel } from './models/maintanencemastermodel';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Loginmodel } from './models/loginmodel';
import { LayoutModule } from './module/shared';
import { Usermodel } from './models/usermodel';
import { Trippaymentsrptmodel } from './models/trippaymentsrptmodel';
import { Ptslabmastermodel } from './models/ptslabmastermodel';
import { Lrbillseriesmodel } from './models/lrbillseriesmodel';
import { Destinationmodel } from './models/destinationmodel';
import { Distancemasterfreightmodel } from './models/distancemasterfreightmodel';
import { Brandmastermodel } from './models/brandmastermodel';
import { Ratetypesmodel } from './models/ratetypesmodel';
import { Tyrepositionmastermodel } from './models/tyrepositionmastermodel';
import { Productgroupmastermodel } from './models/productgroupmastermodel';
import { Productmastermodel } from './models/productmastermodel';
import { DataTablesModule } from 'angular-datatables';
import { UserlistComponent } from './module/user/userlist/userlist.component';
import { UseraddComponent } from './module/user/useradd/useradd.component';
import { AdddestinationComponent } from './module/destination/adddestination/adddestination.component';
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
import { ConfirmationdialogComponent } from './module/shared/confirmationdialog/confirmationdialog.component';
import { ConsignmentaddComponent } from './module/consignment/consignmentadd/consignmentadd.component';
import { ConsignmentlistComponent } from './module/consignment/consignmentlist/consignmentlist.component';
import { Consignmentmodel } from './models/consignmentmodel';
import { Consignmentupdatemodel } from './models/consignmentupdatemodel';
import { Trippaymentsmodel } from './models/trippaymentsmodel';
import { Tripstatusrptmodel } from './models/tripstatusrptmodel';
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
import { BankreceiptentrylistComponent } from './module/bankreceiptentry/bankreceiptentrylist/bankreceiptentrylist.component';
import { AddbankreceiptentryComponent } from './module/bankreceiptentry/addbankreceiptentry/addbankreceiptentry.component';
import { Intermediatescreenmodel } from './models/intermediatescreenmodel';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NumbersonlyDirective } from './directives/numbersonly.directive';
import { DecimalonlyDirective } from './directives/decimalonly.directive';
import { AlphanumericonlyDirective } from './directives/alphanumericonly.directive';
import { TripsheetlistComponent } from './module/tripsheet/tripsheetlist/tripsheetlist.component';
import { TripsheetaddComponent } from './module/tripsheet/tripsheetadd/tripsheetadd.component';
import { UppercaseonlyDirective } from './directives/uppercaseonly.directive';
import { Tripsheetmodel } from './models/tripsheetmodel';
import { Getkmsmodel } from './models/getkmsmodel';
import { DistancemasterfreightaddComponent } from './module/distancemasterfreight/distancemasterfreightadd/distancemasterfreightadd.component';
import { DistancemasterfreightlistComponent } from './module/distancemasterfreight/distancemasterfreightlist/distancemasterfreightlist.component';
import { AddbankcashcontraComponent } from './module/bankcashcontra/addbankcashcontra/addbankcashcontra.component';
import { BankcashcontralistComponent } from './module/bankcashcontra/bankcashcontralist/bankcashcontralist.component';
import { bankreceiptentrymodel } from './models/bankreceiptentrymodel';
import { JournalentrylistComponent } from './module/journalentry/journalentrylist/journalentrylist.component';
import { AddjournalentryComponent } from './module/journalentry/addjournalentry/addjournalentry.component';
import { DieselstatementaddComponent } from './module/dieselstatement/dieselstatementadd/dieselstatementadd.component';
import { DieselstatementlistComponent } from './module/dieselstatement/dieselstatementlist/dieselstatementlist.component';
import { Dieselstatementmodel } from './models/dieselstatementmodel';
import { Dieselstatementlistmodel } from './models/dieselstatementlistmodel';
import { BillstatementaddComponent } from './module/billstatement/billstatementadd/billstatementadd.component';
import { Distancemastertripmodel } from './models/distancemastertripmodel';
import { DistancemastertripaddComponent } from './module/distancemastertrip/distancemastertripadd/distancemastertripadd.component';
import { DistancemastertriplistComponent } from './module/distancemastertrip/distancemastertriplist/distancemastertriplist.component';
import { Billstatementsearchlistrequestmodel } from './models/billstatementsearchlistrequestmodel';
import { AddratesmasterComponent } from './module/ratesmaster/addratesmaster/addratesmaster.component';
import { RatesmasterlistComponent } from './module/ratesmaster/ratesmasterlist/ratesmasterlist.component';
import { Ratesmastermodel } from './models/ratesmastermodel';
import { DriversalarystatementaddComponent } from './module/driversalarystatement/driversalarystatementadd/driversalarystatementadd.component';
import { BillstatementlistComponent } from './module/billstatement/billstatementlist/billstatementlist.component';
import { billstatementmodel } from './models/billstatementmodel';
import { Billstatementsearchmodel } from './models/billstatementsearchmodel';
import { DriversalarystatementlistComponent } from './module/driversalarystatement/driversalarystatementlist/driversalarystatementlist.component';
import { FingroupaddComponent } from './module/fingroup/fingroupadd/fingroupadd.component';
import { FingrouplistComponent } from './module/fingroup/fingrouplist/fingrouplist.component';
import { Fingrouplistmodel } from './models/fingrouplistmodel';
import { Fingroupmodel } from './models/fingroupmodel';
import { FinaccountsmasterlistComponent } from './module/finaccountsmaster/finaccountsmasterlist/finaccountsmasterlist.component';
import { FinaccountsmasteraddComponent } from './module/finaccountsmaster/finaccountsmasteradd/finaccountsmasteradd.component';
import { Finaccountlistmodel } from './models/finaccountlistmodel';
import { Finaccountmodel } from './models/finaccountmodel';
import { Billstypemodel } from './models/billstypemastermodel';
import { Requestmodel } from './models/requestmodel';
import { Driversalarydetailmodel } from './models/driversalarydetailmodel';
import { Driversalarystatementmodel } from './models/driversalarystatementmodel';
import { AddothertripopenComponent } from './module/othertripopen/addothertripopen/addothertripopen.component';
import { OthertripopenlistComponent } from './module/othertripopen/othertripopenlist/othertripopenlist.component';
import { NegdecimalonlyDirective } from './directives/negdecimalonly.directive';
import { Gstpurchaselistmodel } from './models/gstpurchaselistmodel';
import { Gstpurchasemodel } from './models/gstpurchasemodel';
import { FinopenbalancelistComponent } from './module/finopenbalance/finopenbalancelist/finopenbalancelist.component';
import { FinopenbalanceaddComponent } from './module/finopenbalance/finopenbalanceadd/finopenbalanceadd.component';
import { Openingbalancelistmodel } from './models/openingbalancelistmodel';
import { Openingbalancemodel } from './models/openingbalancemodel';
import { Openingbalancerequestmodel } from './models/openingbalancerequestmodel';
import { AddfleetcardmasterComponent } from './module/fleetcardmaster/addfleetcardmaster/addfleetcardmaster.component';
import { FleetcardmasterlistComponent } from './module/fleetcardmaster/fleetcardmasterlist/fleetcardmasterlist.component';
import { Fleetcardmastermodel } from './models/fleetcardmastermodel';
import { AddbrsentryComponent } from './module/opbrsentry/addbrsentry/addbrsentry.component';
import { OpbrsentrylistComponent } from './module/opbrsentry/opbrsentrylist/opbrsentrylist.component';
import { BankreconcilationComponent } from './module/bankreconcilation/bankreconcilation.component';
import { Bankrecfiltermodel } from './models/bankrecfiltermodel';
import { Bankreconcilationlist } from './models/bankreconcilationlist';
import { Bankreconcilationmodel } from './models/bankreconcilationmodel';
import { DistancefreighteditComponent } from './module/distancemasterfreight/distancefreightedit/distancefreightedit.component';
import { Distancefreighteditmodel } from './models/distancefreighteditmodel';
import { DistancetripeditComponent } from './module/distancemastertrip/distancetripedit/distancetripedit.component';
import { Distancetripeditmodel } from './models/distancetripeditmodel';
import { Brsentrymodel } from './models/brsentrymodel';
import { EwaybillextensionlistComponent } from './module/ewaybillextension/ewaybillextensionlist/ewaybillextensionlist.component';
import { EwaybillextensionaddComponent } from './module/ewaybillextension/ewaybillextensionadd/ewaybillextensionadd.component';
import { Ewaybillextlistmodel } from './models/ewaybillextlistmodel';
import { Ewaybillextmodel } from './models/ewaybillextmodel';
import { AddroletypeComponent } from './module/roletype/addroletype/addroletype.component';
import { RoletypelistComponent } from './module/roletype/roletypelist/roletypelist.component';
import { Roletypemodel } from './models/roletypemodel';
import { Passwordmodel } from './models/passwordmodel';
import { ChangepasswordComponent } from './module/password/changepassword/changepassword.component';
import { RoleprivilegesComponent } from './module/roleprivileges/roleprivileges.component';
import { Roleprivilegeslistmodel } from './models/roleprivilegeslistmodel';
import { Roleprivilegesmodel } from './models/roleprivilegesmodel';
import { AddhrmasterComponent } from './module/hrmaster/addhrmaster/addhrmaster.component';
import { HrmasterlistComponent } from './module/hrmaster/hrmasterlist/hrmasterlist.component';
import { Hrmastermodel } from './models/hrmastermodel';
import { ExptruckarrivalreportComponent } from './module/exptruckarrivalreport/exptruckarrivalreport.component';
import { Reportmodel } from './models/reportmodel';
import { Exptruckarrivallistmodel } from './models/exptruckarrivallistmodel';
import { Exptruckarrivalmodel } from './models/exptruckarrivalmodel';
import { Driverlicrptmodel } from './models/driverlicrptmodel';
import { CashbookreportComponent } from './module/cashbookreport/cashbookreport.component';
import { PtslabmasterlistComponent } from './module/ptslabmaster/ptslabmasterlist/ptslabmasterlist.component';
import { AddptslabmasterComponent } from './module/ptslabmaster/addptslabmaster/addptslabmaster.component';
import { DocrenewalrptComponent } from './module/docrenewalrpt/docrenewalrpt/docrenewalrpt.component';
import { Docrenewalrptmodel } from './models/docrenewalrptmodel';
import { DistancemasterfrtrptComponent } from './module/distancemasterfrtrpt/distancemasterfrtrpt/distancemasterfrtrpt.component';
import { DistancemastertriprptComponent } from './module/distancemastertriprpt/distancemastertriprpt/distancemastertriprpt.component';
import { Distancemasterfrtrptmodel } from './models/distancemasterfrtrptmodel';
import { Distancemastertriprptmodel } from './models/distancemastertriprptmodel';
import { TrippaymentsrptComponent } from './module/trippaymentsrpt/trippaymentsrpt/trippaymentsrpt.component';
import { DriverlicrptComponent } from './module/driverlicrpt/driverlicrpt/driverlicrpt.component';
import { DieselstatementrptComponent } from './module/dieselstatementrpt/dieselstatementrpt/dieselstatementrpt.component';
import { Dieselstatementrptmodel } from './models/dieselstatementrptmodel';
import { EmpmasterlistComponent } from './module/empmaster/empmasterlist/empmasterlist.component';
import { EmpmasteraddComponent } from './module/empmaster/empmasteradd/empmasteradd.component';
import { Employeemodel } from './models/employeemodel';
import { Empmasterlistmodel } from './models/empmasterlistmodel';
import { EmpsalarylistComponent } from './module/empsalary/empsalarylist/empsalarylist.component';
import { EmpsalaryaddComponent } from './module/empsalary/empsalaryadd/empsalaryadd.component';
import { Empsalarymstlistmodel } from './models/empsalarymstlistmodel';
import { Empsalarymstmodel } from './models/empsalarymstmodel';
import { Empsalarydtlmodel } from './models/empsalarydtlmodel';
import { EmploanlistComponent } from './module/emploan/emploanlist/emploanlist.component';
import { EmploanaddComponent } from './module/emploan/emploanadd/emploanadd.component';
import { Emploanmodel } from './models/emploanmodel';
import { Emploanlistmodel } from './models/emploanlistmodel';
import { EmploanrepaylistComponent } from './module/emploanrepay/emploanrepaylist/emploanrepaylist.component';
import { EmploanrepayaddComponent } from './module/emploanrepay/emploanrepayadd/emploanrepayadd.component';
import { TripstatusrptComponent } from './module/tripstatusrpt/tripstatusrpt.component';
import { ChangebranchComponent } from './module/branch/changebranch/changebranch.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { HappaystatementlistComponent } from './module/happaystatement/happaystatementlist/happaystatementlist.component';
import { HappaystatementaddComponent } from './module/happaystatement/happaystatementadd/happaystatementadd.component';
import { EmppaygenerationlistComponent } from './module/emppaygeneration/emppaygenerationlist/emppaygenerationlist.component';
import { EmppaygenerationaddComponent } from './module/emppaygeneration/emppaygenerationadd/emppaygenerationadd.component';
import { Emppaycalcmodel } from './models/emppaycalcmodel';
import { Emploanpaymodel } from './models/emploanpaymodel';
import { Empleavemodel } from './models/empleavemodel';
import { Custwizardmodel } from './models/custwizardmodel';
import { EmpsalcalculationlistComponent } from './module/empsalcalculation/empsalcalculationlist/empsalcalculationlist.component';
import { EmpsalcalculationaddComponent } from './module/empsalcalculation/empsalcalculationadd/empsalcalculationadd.component';
import { Emppaycallistmodel } from './models/emppaycallistmodel';
import { Custwizardlistmodel } from './models/custwizardlistmodel';
import { CustwizardaddComponent } from './module/custwizard/custwizardadd/custwizardadd.component';
import { CustwizardlistComponent } from './module/custwizard/custwizardlist/custwizardlist.component';
import { DailyloadingrptComponent } from './module/dailyloadingrpt/dailyloadingrpt.component';
import { LedgerrptComponent } from './module/ledgerrpt/ledgerrpt.component';
import { BankbookrptComponent } from './module/bankbookrpt/bankbookrpt.component';
import { ConsolidatedopenbalComponent } from './module/consolidatedopenbal/consolidatedopenbal.component';
import { GstsalesregisterrptlistComponent } from './module/gstsalesregisterrpt/gstsalesregisterrptlist/gstsalesregisterrptlist.component';
import { HappaystatementrptComponent } from './module/happaystatementrpt/happaystatementrpt.component';
import { EwaybillexprptComponent } from './module/ewaybillexprpt/ewaybillexprpt.component';
import { Gstsalesregisterrptmodel } from './models/gstsalesregisterrptmodel';
import { TripsummaryrptComponent } from './module/tripsummaryrpt/tripsummaryrpt.component';
import { DrpmasteraddComponent } from './module/dprmaster/dprmasteradd/dprmasteradd.component';
import { DrpmasterlistComponent } from './module/dprmaster/dprmasterlist/dprmasterlist.component';
import { Dprmodel } from './models/dprmodel';
import { Dprdtlsmodel } from './models/dprdtlsmodel';
import { Dprlistmodel } from './models/dprlistmodel';
import { DprvehiplacedlistComponent } from './module/dprvehiplaced/dprvehiplacedlist/dprvehiplacedlist.component';
import { DprvehiplacedaddComponent } from './module/dprvehiplaced/dprvehiplacedadd/dprvehiplacedadd.component';
import { Dprvehiplacedmodel } from './models/dprvehiplacedmodel';
import { GeneratetempgclistComponent } from './module/generatetempgc/generatetempgclist/generatetempgclist.component';
import { GeneratetempgcaddComponent } from './module/generatetempgc/generatetempgcadd/generatetempgcadd.component';
import { Tempgcmodel } from './models/tempgcmodel';
import { Tempgclistmodel } from './models/tempgclistmodel';
import {Tyremodelmastermodel } from './models/tyremodelmastermodel';
import { AddtruckmasterComponent } from './module/truckmaster/addtruckmaster/addtruckmaster.component';
import { TruckmasterlistComponent } from './module/truckmaster/truckmasterlist/truckmasterlist.component';
import { Truckmastermodel } from './models/truckmastermodel';
import { ClassificationmasteraddComponent } from './module/classificationmaster/classificationmasteradd/classificationmasteradd.component';
import { ClassificationmasterlistComponent } from './module/classificationmaster/classificationmasterlist/classificationmasterlist.component';
import { Classificationmastermodel } from './models/classificationmastermodel';
import { AddtransportmasterComponent } from './module/transportmaster/addtransportmaster/addtransportmaster.component';
import { TransportmasterlistComponent } from './module/transportmaster/transportmasterlist/transportmasterlist.component';
import { Transportmastermodel } from './models/transportmastermodel';
import { BillsmasteraddComponent } from './module/billsmaster/billsmasteradd/billsmasteradd.component';
import { BillsmasterlistComponent } from './module/billsmaster/billsmasterlist/billsmasterlist.component';
import { Billsmastermodel } from './models/billsmastermodel';
import { ChallanmasterlistComponent } from './module/challanmaster/challanmasterlist/challanmasterlist.component';
import { ChallanmasteraddComponent } from './module/challanmaster/challanmasteradd/challanmasteradd.component';
import { EmppaysheetrptComponent } from './module/emppaysheetrpt/emppaysheetrpt.component';
import { Challanmastermodel } from './models/challanmastermodel';
import { DeliveryackpodlistComponent } from './module/deliveryackpod/deliveryackpodlist/deliveryackpodlist.component';
import { DeliveryackpodaddComponent } from './module/deliveryackpod/deliveryackpodadd/deliveryackpodadd.component';
import { Deliveryackpodmodel } from './models/deliveryackpodmodel';
import {Spareslubesmastermodel } from './models/sparelubesmastermodel';
import { AdddocumentallottmentComponent } from './module/documentallotment/adddocumentallottment/adddocumentallottment.component';
import { Documentallottmentlistcomponent } from './module/documentallotment/documentallottmentlist/documentallottmentlist.component';
import { Documentallotmentmodel } from './models/documentallotmentmodel';
import { BilltypeaddComponent } from './module/billtypemaster/billtypeadd/billtypeadd.component';
import { BilltypelistComponent } from './module/billtypemaster/billtypelist/billtypelist.component';
import { ConsignmentupdateComponent } from './module/consignment/consignmentupdate/consignmentupdate.component';
import { LorryhirepmtlistComponent } from './module/lorryhirepmt/lorryhirepmtlist/lorryhirepmtlist.component';
import { LorryhirepmtaddComponent } from './module/lorryhirepmt/lorryhirepmtadd/lorryhirepmtadd.component';
import { LorryhirepmtreqaddComponent } from './module/lorryhirepmtreq/lorryhirepmtreqadd/lorryhirepmtreqadd.component';
import { LorryhirepmtreqlistComponent } from './module/lorryhirepmtreq/lorryhirepmtreqlist/lorryhirepmtreqlist.component';
import { LorryhirepmtaprvlistComponent } from './module/lorryhirepmtaprv/lorryhirepmtaprvlist/lorryhirepmtaprvlist.component';
import { LorryhirepmtaprvaddComponent } from './module/lorryhirepmtaprv/lorryhirepmtaprvadd/lorryhirepmtaprvadd.component';
import { Lorryhirereqmodel } from './models/lorryhirereqmodel';
import { Lorryhiremastermodel } from './models/lorryhiremastermodel';
import { SpareslubesmasteraddComponent } from './module/spareslubesmaster/spareslubesmasteradd/spareslubesmasteradd.component';
import { SpareslubesmasterlistComponent } from './module/spareslubesmaster/spareslubesmasterlist/spareslubesmasterlist.component';
import { TyremodeladdComponent } from './module/tyremodelmaster/tyremodeladd/tyremodeladd.component';
import { TyremodellistComponent } from './module/tyremodelmaster/tyremodellist/tyremodellist.component';
import { MaintanencemasteraddComponent } from './module/maintanencemaster/maintanencemasteradd/maintanencemasteradd.component';
import { MaintanencemasterlistComponent } from './module/maintanencemaster/maintanencemasterlist/maintanencemasterlist.component';
import { TyrepurchasemasteraddComponent } from './module/tyrepurchasemaster/tyrepurchasemasteradd/tyrepurchasemasteradd.component';
import { TyrepurchasemasterlistComponent } from './module/tyrepurchasemaster/tyrepurchasemasterlist/tyrepurchasemasterlist.component';
import { Tyrepurchasemastermodel } from './models/tyrepurchasemastermodel';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UseraddComponent,
    UserlistComponent,
    AdddestinationComponent,
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
    BankreceiptentrylistComponent,
    AddbankreceiptentryComponent,
    NumbersonlyDirective,
    DecimalonlyDirective,
    AlphanumericonlyDirective,
    TripsheetlistComponent,
    TripsheetaddComponent,
    UppercaseonlyDirective,
    DistancemasterfreightaddComponent,
    DistancemasterfreightlistComponent,
    DistancemastertriplistComponent,
    DistancemastertripaddComponent,
    AddbankcashcontraComponent,
    BankcashcontralistComponent,
    JournalentrylistComponent,
    AddjournalentryComponent,
    DieselstatementaddComponent,
    DieselstatementlistComponent,
    BillstatementaddComponent,
    DistancemastertripaddComponent,
    AddratesmasterComponent,
    RatesmasterlistComponent,
    DriversalarystatementaddComponent,
    DieselstatementlistComponent,
    BillstatementlistComponent,
    DriversalarystatementlistComponent,
    FingroupaddComponent,
    FingrouplistComponent,
    FinaccountsmasterlistComponent,
    FinaccountsmasteraddComponent,
    AddothertripopenComponent,
    OthertripopenlistComponent,
    NegdecimalonlyDirective,
    FinopenbalancelistComponent,
    FinopenbalanceaddComponent,
    AddfleetcardmasterComponent,
    FleetcardmasterlistComponent,
    BankreconcilationComponent,
    AddbrsentryComponent,
    OpbrsentrylistComponent,
    DistancefreighteditComponent,
    DistancetripeditComponent,
    EwaybillextensionlistComponent,
    EwaybillextensionaddComponent,
    AddroletypeComponent,
    RoletypelistComponent,
    ChangepasswordComponent,
    RoleprivilegesComponent,
    AddhrmasterComponent,
    HrmasterlistComponent,
    PtslabmasterlistComponent,
    AddptslabmasterComponent,
    ExptruckarrivalreportComponent,
    CashbookreportComponent,
    DocrenewalrptComponent,
    DistancemasterfrtrptComponent,
    DistancemastertriprptComponent,
    TrippaymentsrptComponent,
    DriverlicrptComponent,
    DieselstatementrptComponent,
    EmpmasterlistComponent,
    EmpmasteraddComponent,
    EmpsalarylistComponent,
    EmpsalaryaddComponent,
    EmploanlistComponent,
    EmploanaddComponent,
    EmploanrepaylistComponent,
    EmploanrepayaddComponent,
    TripstatusrptComponent,
    ChangebranchComponent,
    HappaystatementlistComponent,
    HappaystatementaddComponent,
    EmppaygenerationlistComponent,
    EmppaygenerationaddComponent,
    EmpsalcalculationlistComponent,
    EmpsalcalculationaddComponent,
    CustwizardaddComponent,
    CustwizardlistComponent,
    DailyloadingrptComponent,
    LedgerrptComponent,
    BankbookrptComponent,
    ConsolidatedopenbalComponent,
    HappaystatementrptComponent,
    EwaybillexprptComponent,
    GstsalesregisterrptlistComponent,
    TripsummaryrptComponent,
    DrpmasteraddComponent,
    DrpmasterlistComponent,
    DprvehiplacedlistComponent,
    DprvehiplacedaddComponent,
    GeneratetempgclistComponent,
    GeneratetempgcaddComponent,
    AddtruckmasterComponent,
    TruckmasterlistComponent,
    ClassificationmasteraddComponent,
    ClassificationmasterlistComponent,
    AddtransportmasterComponent,
    TransportmasterlistComponent,
    BillsmasteraddComponent,
    BillsmasterlistComponent,
    ChallanmasterlistComponent,
    ChallanmasteraddComponent,
    EmppaysheetrptComponent,
    DeliveryackpodlistComponent,
    DeliveryackpodaddComponent,
    AdddocumentallottmentComponent,
    Documentallottmentlistcomponent,
    BilltypeaddComponent,
    BilltypelistComponent,
    ConsignmentupdateComponent,
    LorryhirepmtlistComponent,
    LorryhirepmtaddComponent,
    LorryhirepmtreqaddComponent,
    LorryhirepmtreqlistComponent,
    LorryhirepmtaprvlistComponent,
    LorryhirepmtaprvaddComponent,
    SpareslubesmasteraddComponent,
    SpareslubesmasterlistComponent,
    TyremodeladdComponent,
    TyremodellistComponent,
    MaintanencemasteraddComponent,
    MaintanencemasterlistComponent,
    TyrepurchasemasteraddComponent,
    TyrepurchasemasterlistComponent,
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
    LayoutModule,
    AutocompleteLibModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
  ],
  
  providers: [Loginmodel, Usermodel, Destinationmodel, Productgroupmastermodel, Productmastermodel, 
    Brandmastermodel, Tyrepositionmastermodel, Docrenewalmastermodel, Ratetypesmodel, 
    Lrbillseriesmodel, Vehicletypemastermodel, Vehicletypegroupmastermodel, Consignmentmodel, 
    Branchmodel, Vehiclefltmastermodel, Cnorcneemastermodel, Trippaymentsmodel, Drivermodel, 
    Docrenewalmastermodel, Docrenewalentrymodel, 
    Intermediatescreenmodel,Tripsheetmodel,
    Distancemasterfreightmodel,Distancefreighteditmodel,
    Distancemastertripmodel,Distancetripeditmodel,
    bankreceiptentrymodel,Ratesmastermodel,billstatementmodel,
    Dieselstatementlistmodel, Dieselstatementmodel, 
    Billstatementsearchlistrequestmodel, Deliveryackpodmodel,
    Fingrouplistmodel,Fingroupmodel,Finaccountlistmodel,Finaccountmodel,
    Openingbalancelistmodel,Openingbalancemodel,Openingbalancerequestmodel,
    Bankrecfiltermodel,Bankreconcilationmodel,Bankreconcilationlist,
    Requestmodel,Reportmodel,Dprvehiplacedmodel,
    Ewaybillextlistmodel,Ewaybillextmodel,
    Roleprivilegeslistmodel,Roleprivilegesmodel,
    Driversalarydetailmodel,Driversalarystatementmodel,Gstpurchaselistmodel,Gstpurchasemodel,
    Fleetcardmastermodel,Brsentrymodel,Lorryhiremastermodel,
    Driversalarydetailmodel,Driversalarystatementmodel,Gstpurchaselistmodel,
    Gstpurchasemodel,Fleetcardmastermodel,Brsentrymodel,Roletypemodel,Passwordmodel,
    Hrmastermodel,Ptslabmastermodel,Distancemasterfrtrptmodel,Distancemastertriprptmodel,
    Driversalarydetailmodel,Driversalarystatementmodel,
    Employeemodel,Empmasterlistmodel,Emploanmodel, Emploanlistmodel,
    Empsalarymstlistmodel,Empsalarymstmodel,Empsalarydtlmodel,
    Emppaycalcmodel,Emppaycallistmodel,Emploanpaymodel,Empleavemodel,Lorryhirereqmodel,
    Dprmodel,Dprdtlsmodel,Dprlistmodel,Tempgcmodel,Tempgclistmodel,Challanmastermodel,
    Exptruckarrivallistmodel,Exptruckarrivalmodel, Docrenewalrptmodel,Trippaymentsrptmodel,
    Driverlicrptmodel,Billstatementsearchmodel,Dieselstatementrptmodel,Tripstatusrptmodel,
    Custwizardmodel,Gstsalesregisterrptmodel,Truckmastermodel,Classificationmastermodel,
    Gstpurchaselistmodel,Gstpurchasemodel,Fleetcardmastermodel,Brsentrymodel,Roletypemodel,Tyremodelmastermodel,
    Passwordmodel,Transportmastermodel,Documentallotmentmodel,Consignmentupdatemodel,Spareslubesmastermodel,Maintanencemastermodel,Tyrepurchasemastermodel,
    Custwizardmodel,Gstsalesregisterrptmodel,Truckmastermodel,Classificationmastermodel,Billsmastermodel,Billstypemodel,
    Gstpurchaselistmodel,Gstpurchasemodel,Fleetcardmastermodel,Brsentrymodel,Roletypemodel,Passwordmodel,Transportmastermodel],
  bootstrap: [AppComponent]
})
export class AppModule { }
