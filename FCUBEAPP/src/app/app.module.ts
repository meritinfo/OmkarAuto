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
import { Vehicleinstpmtmodel } from 'src/app/models/vehicleinstpmtmodel';
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
import { VehicleinstschedulelistComponent } from './module/vehicleinstschedule/vehicleinstschedulelist/vehicleinstschedulelist.component';
import { VehicleinstscheduleaddComponent } from './module/vehicleinstschedule/vehicleinstscheduleadd/vehicleinstscheduleadd.component';
import { Vehicleinstschedulemodel } from './models/vehicleinstschedulemodel';
import { LrbillupdateComponent } from './module/lrbillupdate/lrbillupdate/lrbillupdate.component';
import { VehicleinstpmtaddComponent } from './module/vehicleinstpmt/vehicleinstpmtadd/vehicleinstpmtadd.component';
import { VehicleinstpmtlistComponent } from './module/vehicleinstpmt/vehicleinstpmtlist/vehicleinstpmtlist.component';
import { CompanyinfoaddComponent } from './module/companyinfo/companyinfoadd/companyinfoadd.component';
import { BalanacerptComponent } from './module/balanacerpt/balanacerpt.component';
import { Companyinfomodel } from './models/companyinfomodel';
import { MraddComponent } from './module/moneyreceipt/mradd/mradd.component';
import { MrlistComponent } from './module/moneyreceipt/mrlist/mrlist.component';
import { Mrmodel } from './models/mrmodel';
import { TyrepurchasemasteraddComponent } from './module/tyrepurchasemaster/tyrepurchasemasteradd/tyrepurchasemasteradd.component';
import { TyrepurchasemasterlistComponent } from './module/tyrepurchasemaster/tyrepurchasemasterlist/tyrepurchasemasterlist.component';
import { Tyrepurchasemastermodel } from './models/tyrepurchasemastermodel';
import { TyreativatelistComponent } from './module/tyreactivate/tyreativatelist/tyreativatelist.component';
import { TyreativateaddComponent } from './module/tyreactivate/tyreativateadd/tyreativateadd.component';
import { Tyreactivatemastermodel } from './models/tyreactivatemastermodel';
import { TyredeativatelistComponent } from './module/tyredeactivate/tyredeativatelist/tyredeativatelist.component';
import { TyredeativateaddComponent } from './module/tyredeactivate/tyredeativateadd/tyredeativateadd.component';
import { Tyredeactivatemastermodel } from './models/tyredeactivatemastermodel';
import { TyreregroupissuelistComponent } from './module/tyreregroupissue/tyreregroupissuelist/tyreregroupissuelist.component';
import { TyreregroupissueaddComponent } from './module/tyreregroupissue/tyreregroupissueadd/tyreregroupissueadd.component';
import { Tyreregroupissuemastermodel } from './models/tyreregroupissuemastermodel';
import { TyreregrouprecdlistComponent } from './module/tyreregrouprecd/tyreregrouprecdlist/tyreregrouprecdlist.component';
import { TyreregrouprecdaddComponent } from './module/tyreregrouprecd/tyreregrouprecdadd/tyreregrouprecdadd.component';
import { Tyreregrouprecdmastermodel } from './models/tyreregrouprecdmastermodel';
import { FleetloadentryaddComponent } from './module/fleetloadentry/fleetloadentryadd/fleetloadentryadd.component';
import { FleetloadentrylistComponent } from './module/fleetloadentry/fleetloadentrylist/fleetloadentrylist.component';
import { Fleetloadentrymodel } from './models/fleetloadentrymodel';
import { DieselstmtlistComponent } from './module/dieselstmt/dieselstmtlist/dieselstmtlist.component';
import { DieselstmtaddComponent } from './module/dieselstmt/dieselstmtadd/dieselstmtadd.component';
import { Dieselstmtmodel } from './models/dieselstmtmodel';
import { VehiclerepmaintMaster } from './models/vehiclerepmaintmastermodel';
import { TyresaleslistComponent } from './module/tyresales/tyresaleslist/tyresaleslist.component';
import { TyresalesaddComponent } from './module/tyresales/tyresalesadd/tyresalesadd.component';
import { LhpmslabmasteraddComponent } from './module/lhpmslabmaster/lhpmslabmasteradd/lhpmslabmasteradd.component';
import { LhpmslabmasterlistComponent } from './module/lhpmslabmaster/lhpmslabmasterlist/lhpmslabmasterlist.component';
import { Lhpmslabmastermodel } from './models/lhpmslabmastermodel';
import { TripexptypemasteraddComponent } from './module/tripexptypemaster/tripexptypemasteradd/tripexptypemasteradd.component';
import { TripexptypemasterlistComponent } from './module/tripexptypemaster/tripexptypemasterlist/tripexptypemasterlist.component';
import { TripexptypemasterModel } from './models/tripexptypemastermodel';
import { FinaccountmastergstComponent } from './module/finaccountmastergst/finaccountmastergst.component';
import { Finaccountsmastergstmodel } from './models/finaccountsmastergstmodel';
import { BookingregisterComponent } from './module/bookingregister/bookingregister.component';
import { Sparespurchasemastermodel } from 'src/app/models/sparespurchasemastermodel';
import { LrwithoutchallanrptComponent } from './module/lrwithoutchallanrpt/lrwithoutchallanrpt.component';
import { UnbilledrptComponent } from './module/unbilledrpt/unbilledrpt.component';
import { CnenquiryComponent } from './module/cnenquiry/cnenquiry.component';
import { SparespurchasemasteraddComponent } from './module/sparespurchasemaster/sparespurchasemasteradd/sparespurchasemasteradd.component';
import { SparespurchasemasterlistComponent } from './module/sparespurchasemaster/sparespurchasemasterlist/sparespurchasemasterlist.component';
import { TyrepurchaserptComponent } from './module/tyrepurchaserpt/tyrepurchaserpt.component';
import { TyrestockrptComponent } from './module/tyrestockrpt/tyrestockrpt.component';
import { TyrehistoryrptComponent } from './module/tyrehistoryrpt/tyrehistoryrpt.component';
import { TyreactiverptComponent } from './module/tyreactiverpt/tyreactiverpt.component';
import { TyreactivatedrptComponent } from './module/tyreactivatedrpt/tyreactivatedrpt.component';
import { TyredeactivatedrptComponent } from './module/tyredeactivatedrpt/tyredeactivatedrpt.component';
import { TyreregroupissrptComponent } from './module/tyreregroupissrpt/tyreregroupissrpt.component';
import { TyreregrouprcvdrptComponent } from './module/tyreregrouprcvdrpt/tyreregrouprcvdrpt.component';
import { VehiclerepmaintaddComponent } from './module/vehiclerepmaint/vehiclerepmaintadd/vehiclerepmaintadd.component';
import { VehiclerepmaintlistComponent } from './module/vehiclerepmaint/vehiclerepmaintlist/vehiclerepmaintlist.component';
import { VehicleadvbalreceiptaddComponent } from './module/vehicleadvreceipt/vehicleadvbalreceiptadd/vehicleadvbalreceiptadd.component';
import { VehicleadvbalreceiptlistComponent } from './module/vehicleadvreceipt/vehicleadvbalreceiptlist/vehicleadvbalreceiptlist.component';
import { VehicleadvbalreceiptModel } from 'src/app/models/vehicleadvbalreceiptmodel';
import { DprplacevehicleComponent } from './module/dprvehiplaced/dprplacevehicle/dprplacevehicle.component';
import { GeneratetempgceditComponent } from './module/generatetempgc/generatetempgcedit/generatetempgcedit.component';
import { ChallanregisterrptComponent } from './module/challanregisterrpt/challanregisterrpt.component';
import { SparespurchaserptComponent } from './module/sparespurchaserpt/sparespurchaserpt.component';
 import { Challanregisterrptmodel } from './models/challanregisterrptmodel';
import { LhpayablestatusrptComponent } from './module/lhpayablestatusrpt/lhpayablestatusrpt.component';
import { Lhpayablestatusrptmodel } from './models/lhpayablestatusrptmodel';


@NgModule({
  declarations: [
    AppComponent,LoginComponent,DashboardComponent,ConfirmationdialogComponent,
    IntermediatescreenComponent,NegdecimalonlyDirective,
    NumbersonlyDirective,DecimalonlyDirective,AlphanumericonlyDirective,
    TripsheetlistComponent,TripsheetaddComponent,UppercaseonlyDirective,
    UseraddComponent,UserlistComponent,ChangebranchComponent,
    ChangepasswordComponent,RoleprivilegesComponent,
    AdddestinationComponent,DestinationlistComponent,
    ProductgroupmasterlistComponent, AddproductgroupmasterComponent,
    ProductmasterlistComponent,AddproductmasterComponent,
    BrandmasterlistComponent,AddbrandmasterComponent,
    TyrepositionmasterlistComponent,AddtyrepositionmasterComponent,
    DocrenewalmasterlistComponent,AdddocrenewalmasterComponent,
    RatetypeslistComponent,AddratetypesComponent,
    LrbillserieslistComponent,AddlrbillseriesComponent,
    VehicletypemasterlistComponent,AddvehicletypemasterComponent,
    VehicletypegroupmasterlistComponent,AddvehicletypegroupmasterComponent,
    ConsignmentaddComponent, ConsignmentlistComponent,
    AddbranchmasterComponent,BranchmasterlistComponent,
    VehiclemasteraddComponent,VehiclemasterlistComponent,
    ListcnorcneemasterComponent,AddcnorcneemasterComponent,
    DrivermasteraddComponent,DrivermasterlistComponent,
    AddtrippaymentsComponent,TrippaymentslistComponent,
    GstpurchaseaddComponent,GstpurchaselistComponent,
    AdddocrenewalentryComponent,DocrenewalentrylistComponent,
    CashreceiptentrylistComponent,AddcashreceiptentryComponent,
    BankreceiptentrylistComponent,AddbankreceiptentryComponent,
    DistancemasterfreightaddComponent,DistancemasterfreightlistComponent,DistancefreighteditComponent,
    DistancemastertriplistComponent,DistancemastertripaddComponent, DistancetripeditComponent,
    AddbankcashcontraComponent,BankcashcontralistComponent,
    JournalentrylistComponent,AddjournalentryComponent,
    DieselstatementaddComponent,DieselstatementlistComponent,
    BillstatementaddComponent,BillstatementlistComponent,
    AddratesmasterComponent,RatesmasterlistComponent,
    DriversalarystatementaddComponent,DriversalarystatementlistComponent,
    FingroupaddComponent,FingrouplistComponent,
    FinaccountsmasterlistComponent,FinaccountsmasteraddComponent,
    FinopenbalancelistComponent,FinopenbalanceaddComponent,
    AddfleetcardmasterComponent,FleetcardmasterlistComponent,
    BankreconcilationComponent,
    AddbrsentryComponent,OpbrsentrylistComponent, 
    EwaybillextensionlistComponent,EwaybillextensionaddComponent,
    AddroletypeComponent,RoletypelistComponent,
    AddhrmasterComponent,HrmasterlistComponent,
    PtslabmasterlistComponent,AddptslabmasterComponent,
    ExptruckarrivalreportComponent,
    CashbookreportComponent,
    DocrenewalrptComponent,
    DistancemasterfrtrptComponent,
    DistancemastertriprptComponent,
    TrippaymentsrptComponent,
    DriverlicrptComponent,
    DieselstatementrptComponent,
    EmpmasterlistComponent,EmpmasteraddComponent,
    EmpsalarylistComponent, EmpsalaryaddComponent,
    EmploanlistComponent, EmploanaddComponent,
    EmploanrepaylistComponent, EmploanrepayaddComponent,
    TripstatusrptComponent, 
    HappaystatementlistComponent,  HappaystatementaddComponent,
    EmppaygenerationlistComponent, EmppaygenerationaddComponent,
    EmpsalcalculationlistComponent,EmpsalcalculationaddComponent,
    CustwizardaddComponent, 
    DailyloadingrptComponent,TripsummaryrptComponent,
    LedgerrptComponent, BankbookrptComponent,ConsolidatedopenbalComponent,
    HappaystatementrptComponent,
    EwaybillexprptComponent, GstsalesregisterrptlistComponent,    
    DrpmasteraddComponent, DrpmasterlistComponent,
    DprvehiplacedlistComponent, DprvehiplacedaddComponent,
    GeneratetempgclistComponent, GeneratetempgcaddComponent,
    AddtruckmasterComponent, TruckmasterlistComponent,
    ClassificationmasteraddComponent, ClassificationmasterlistComponent,
    AddtransportmasterComponent, TransportmasterlistComponent,
    BillsmasteraddComponent, BillsmasterlistComponent,
    ChallanmasterlistComponent,  ChallanmasteraddComponent,
    EmppaysheetrptComponent, 
    DeliveryackpodlistComponent, DeliveryackpodaddComponent, 
    AdddocumentallottmentComponent, Documentallottmentlistcomponent,
    BilltypeaddComponent, BilltypelistComponent,
    ConsignmentupdateComponent, 
    LorryhirepmtlistComponent,  LorryhirepmtaddComponent,
    LorryhirepmtreqaddComponent, LorryhirepmtreqlistComponent,
    LorryhirepmtaprvlistComponent,LorryhirepmtaprvaddComponent,
    SpareslubesmasteraddComponent,SpareslubesmasterlistComponent,
    TyremodeladdComponent, TyremodellistComponent,
    MaintanencemasteraddComponent,  MaintanencemasterlistComponent,
    VehicleinstschedulelistComponent,VehicleinstscheduleaddComponent, 
    BalanacerptComponent,LrbillupdateComponent,
    VehicleinstpmtaddComponent, VehicleinstpmtlistComponent,
    CompanyinfoaddComponent, MraddComponent, MrlistComponent, 
    TyrepurchasemasteraddComponent, TyrepurchasemasterlistComponent,   
    TyreativatelistComponent, TyreativateaddComponent, 
    TyredeativatelistComponent, TyredeativateaddComponent, 
    TyreregroupissuelistComponent, TyreregroupissueaddComponent, 
    TyreregrouprecdlistComponent, TyreregrouprecdaddComponent,
    DieselstmtlistComponent, DieselstmtaddComponent ,
    FleetloadentryaddComponent, FleetloadentrylistComponent, 
    LhpmslabmasteraddComponent, LhpmslabmasterlistComponent ,
    TyresaleslistComponent, TyresalesaddComponent, FinaccountmastergstComponent ,
    TripexptypemasteraddComponent, TripexptypemasterlistComponent, 
    BookingregisterComponent, LrwithoutchallanrptComponent, UnbilledrptComponent,
    CnenquiryComponent,
    SparespurchasemasteraddComponent,SparespurchasemasterlistComponent,
    TyrepurchaserptComponent, TyrestockrptComponent,
    TyrehistoryrptComponent, TyreactiverptComponent,
    TyreactivatedrptComponent, TyredeactivatedrptComponent,
    TyreregroupissrptComponent, TyreregrouprcvdrptComponent, 
    VehiclerepmaintaddComponent, VehiclerepmaintlistComponent, 
    VehicleadvbalreceiptaddComponent, VehicleadvbalreceiptlistComponent,
    DprplacevehicleComponent, GeneratetempgceditComponent, SparespurchaserptComponent, 
    LhpayablestatusrptComponent,
    ChallanregisterrptComponent,
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
    Branchmodel, Vehiclefltmastermodel, Cnorcneemastermodel, 
    Trippaymentsmodel, Drivermodel, Docrenewalentrymodel, 
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
    Fleetcardmastermodel,Brsentrymodel,Lorryhiremastermodel,Roletypemodel,Passwordmodel,
    Hrmastermodel,Ptslabmastermodel,Distancemasterfrtrptmodel,Distancemastertriprptmodel,
    Employeemodel,Empmasterlistmodel,Emploanmodel, Emploanlistmodel,
    Empsalarymstlistmodel,Empsalarymstmodel,Empsalarydtlmodel,
    Emppaycalcmodel,Emppaycallistmodel,Emploanpaymodel,Empleavemodel,Lorryhirereqmodel,
    Dprmodel,Dprdtlsmodel,Dprlistmodel,Tempgcmodel,Tempgclistmodel,Challanmastermodel,
    Exptruckarrivallistmodel,Exptruckarrivalmodel, Docrenewalrptmodel,Trippaymentsrptmodel,
    Driverlicrptmodel,Billstatementsearchmodel,Dieselstatementrptmodel,Tripstatusrptmodel,
    Custwizardmodel,Gstsalesregisterrptmodel,Truckmastermodel,Classificationmastermodel,
    Tyremodelmastermodel,Vehicleinstschedulemodel,Transportmastermodel,
    Documentallotmentmodel,Consignmentupdatemodel,Spareslubesmastermodel,Maintanencemastermodel,
    Billsmastermodel,Billstypemodel,
    Companyinfomodel,  Mrmodel  ,Vehicleinstpmtmodel,
    Tyrepurchasemastermodel,Tyreactivatemastermodel,Tyredeactivatemastermodel,
    Tyreregroupissuemastermodel, Tyreregrouprecdmastermodel,
    Dieselstmtmodel,Fleetloadentrymodel,Lhpmslabmastermodel,
    Finaccountsmastergstmodel,TripexptypemasterModel,
    Sparespurchasemastermodel,VehiclerepmaintMaster,VehicleadvbalreceiptModel,
    Lhpayablestatusrptmodel,
    Challanregisterrptmodel,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
