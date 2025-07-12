import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { BrokeradvancepmtModel } from './models/brokeradvancepmtmodel';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { Unbilledprovisionmstmodel } from './models/unbillprovisionmst';
import { Menureportaccessrightsmodel } from './models/menureportaccessmodel';
import { AppComponent } from './app.component';
import { LoginComponent } from './module/login/login.component';
import { ChallanlistmodelllP } from './models/challanmasterlistllp';
import { Maintanencemastermodel } from './models/maintanencemastermodel';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Loginmodel } from './models/loginmodel';
import { LayoutModule } from './module/shared';
import { Usermodel } from './models/usermodel';
import { Branchcustomertargetmodel } from 'src/app//models/branchcustomertargetmstmodel';
import { Userlistmodel } from './models/userlistmodel';
import { Trippaymentsrptmodel } from './models/trippaymentsrptmodel';
import { Ptslabmastermodel } from './models/ptslabmastermodel';
import { Lrbillseriesmodel } from './models/lrbillseriesmodel';
import { Panwisetdsratemodel } from './models/panwisetdsratemodel';
import { Billsubmitmastermodel } from './models/billsubmitmastermodel';
import { Destinationmodel } from './models/destinationmodel';
import { Deliverydisputeentrymodel } from './models/deliverydisputeentrymodel';
import { Distancemasterfreightmodel } from './models/distancemasterfreightmodel';
import { Brandmastermodel } from './models/brandmastermodel';
import { Ratetypesmodel } from './models/ratetypesmodel';
import { Tyrepositionmastermodel } from './models/tyrepositionmastermodel';
import { Productgroupmastermodel } from './models/productgroupmastermodel';
import { Productmastermodel } from './models/productmastermodel';
import { ChallanreleaseModel } from 'src/app/models/challanreleasemodel';
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
import { Subledgermodel } from 'src/app/models/subledgermodel';
import { Gstpctvaluesmodel  } from 'src/app/models/gstpctvaluesmodel';
import { TripenrouteexpbycompanyModel } from 'src/app/models/tripenroutebycompanymodel';
import { Cnorcneemastermodel } from './models/cnorcneemastermodel';
import { Driversalarypaymentmodel } from 'src/app//models/driversalarypaymentmodel';
import { VehiclemasteraddComponent } from './module/vehiclemaster/vehiclemasteradd/vehiclemasteradd.component';
import { VehiclemasterlistComponent } from './module/vehiclemaster/vehiclemasterlist/vehiclemasterlist.component';
import { Vehiclefltmastermodel } from './models/vehiclefltmastermodel';
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
import { Admingroupmastermodel } from 'src/app/models/admingroupmastermodel';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NumbersonlyDirective } from './directives/numbersonly.directive';
import { DecimalonlyDirective } from './directives/decimalonly.directive';
import { AlphanumericonlyDirective } from './directives/alphanumericonly.directive';
import { TripsheetlistComponent } from './module/tripsheet/tripsheetlist/tripsheetlist.component';
import { TripsheetaddComponent } from './module/tripsheet/tripsheetadd/tripsheetadd.component';
import { UppercaseonlyDirective } from './directives/uppercaseonly.directive';
import { Tripsheetmodel } from './models/tripsheetmodel';
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
import { Distancemastertripmodel } from './models/distancemastertripmodel';
import { DistancemastertripaddComponent } from './module/distancemastertrip/distancemastertripadd/distancemastertripadd.component';
import { DistancemastertriplistComponent } from './module/distancemastertrip/distancemastertriplist/distancemastertriplist.component';
import { AddratesmasterComponent } from './module/ratesmaster/addratesmaster/addratesmaster.component';
import { RatesmasterlistComponent } from './module/ratesmaster/ratesmasterlist/ratesmasterlist.component';
import { Ratesmastermodel } from './models/ratesmastermodel';
import { DriversalarystatementaddComponent } from './module/driversalarystatement/driversalarystatementadd/driversalarystatementadd.component';
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
import { Emppaycalcmodel } from './models/emppaycalcmodel';
import { Emploanpaymodel } from './models/emploanpaymodel';
import { Empleavemodel } from './models/empleavemodel';
import { Custwizardmodel } from './models/custwizardmodel';
import { EmpsalcalculationlistComponent } from './module/empsalcalculation/empsalcalculationlist/empsalcalculationlist.component';
import { EmpsalcalculationaddComponent } from './module/empsalcalculation/empsalcalculationadd/empsalcalculationadd.component';
import { Emppaycallistmodel } from './models/emppaycallistmodel';
import { CustwizardaddComponent } from './module/custwizard/custwizardadd/custwizardadd.component';
import { DailyloadingrptComponent } from './module/dailyloadingrpt/dailyloadingrpt.component';
import { LedgerrptComponent } from './module/ledgerrpt/ledgerrpt.component';
import { BankbookrptComponent } from './module/bankbookrpt/bankbookrpt.component';
import { ConsolidatedopenbalComponent } from './module/consolidatedopenbal/consolidatedopenbal.component';
import { GstsalesregisterrptlistComponent } from './module/gstsalesregisterrpt/gstsalesregisterrptlist/gstsalesregisterrptlist.component';
import { EwaybillexprptComponent } from './module/ewaybillexprpt/ewaybillexprpt.component';
import { Gstsalesregisterrptmodel } from './models/gstsalesregisterrptmodel';
import { DrpmasteraddComponent } from './module/dprmaster/dprmasteradd/dprmasteradd.component';
import { DrpmasterlistComponent } from './module/dprmaster/dprmasterlist/dprmasterlist.component';
import { Dprmodel } from './models/dprmodel';
import { Dprdtlsmodel } from './models/dprdtlsmodel';
import { Dprlistmodel } from './models/dprlistmodel';
import { Ccinvdetailmodel } from 'src/app/models/cciinvdetailmodel';
import { DprvehiplacedlistComponent } from './module/dprvehiplaced/dprvehiplacedlist/dprvehiplacedlist.component';
import { DprvehiplacedaddComponent } from './module/dprvehiplaced/dprvehiplacedadd/dprvehiplacedadd.component';
import { DprvehiplacededitComponent } from './module/dprvehiplaced/dprvehiplacededit/dprvehiplacededit.component';
import { Dprvehiplacedmodel } from './models/dprvehiplacedmodel';
import { GeneratetempgclistComponent } from './module/generatetempgc/generatetempgclist/generatetempgclist.component';
import { GeneratetempgcaddComponent } from './module/generatetempgc/generatetempgcadd/generatetempgcadd.component';
import { Tempgcmodel } from './models/tempgcmodel';
import { Tempgclistmodel } from './models/tempgclistmodel';
import { Tyremodelmastermodel } from './models/tyremodelmastermodel';
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
import { Spareslubesmastermodel } from './models/sparelubesmastermodel';
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
import { Partymislocationmodel } from './models/partymislocationsmodel';
import { DieselstmtlistComponent } from './module/dieselstmt/dieselstmtlist/dieselstmtlist.component';
import { DieselstmtaddComponent } from './module/dieselstmt/dieselstmtadd/dieselstmtadd.component';
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
import { GeneratetempgceditComponent } from './module/generatetempgc/generatetempgcedit/generatetempgcedit.component';
import { ChallanregisterrptComponent } from './module/challanregisterrpt/challanregisterrpt.component';
import { SparespurchaserptComponent } from './module/sparespurchaserpt/sparespurchaserpt.component';
import { Challanregisterrptmodel } from './models/challanregisterrptmodel';
import { LhpayablestatusrptComponent } from './module/lhpayablestatusrpt/lhpayablestatusrpt.component';
import { Lhpayablestatusrptmodel } from './models/lhpayablestatusrptmodel';
import { Vehiclerepairsrptmodel } from './models/vehiclerepairsrptmodel';
import { VehiclerepairsrptComponent } from './module/vehiclerepairsrpt/vehiclerepairsrpt.component';
import { BillregisterrptComponent } from './module/billregisterrpt/billregisterrpt.component';
import { Billregisterrptmodel } from './models/billregisterrptmodel';
import { MrregisterrptComponent } from './module/mrregisterrpt/mrregisterrpt.component';
import { Mrregisterrptmodel } from './models/mrregisterrptmodel';
import { Benificiarymastermodel  } from 'src/app/models/benificiarymastermodel';
import { Expensebudgetlistmodel  } from 'src/app/models/expensebudgetlistmodel';
import { BenificiarymasteraddComponent } from './module/benificiarymaster/benificiarymasteradd/benificiarymasteradd.component';
import { BenificiarymasterlistComponent } from './module/benificiarymaster/benificiarymasterlist/benificiarymasterlist.component';
import { CnorcneemasterlistComponent } from './module/cnorcneemaster/cnorcneemasterlist/cnorcneemasterlist.component';
import { CnorcneemasteraddComponent } from './module/cnorcneemaster/cnorcneemasteradd/cnorcneemasteradd.component';
import { Lhpmvariancerptmodel } from './models/lhpmvariancerptmodel';
import { LhpmvariancerptComponent } from './module/lhpmvariancerpt/lhpmvariancerpt.component';
import { Gstregisterrptmodel } from './models/gstregisterrptmodel';
import { GstregisterrptComponent } from './module/gstregisterrpt/gstregisterrpt.component';
import { CnorcneegstaddComponent } from './module/cnorcneegst/cnorcneegstadd/cnorcneegstadd.component';
import { CnorcneegstlistComponent } from './module/cnorcneegst/cnorcneegstlist/cnorcneegstlist.component';
import { DieselstmtrptComponent } from './module/dieselstmtrpt/dieselstmtrpt.component';
import { ExpensebudgetsaddComponent } from './module/expensebudgetsadd/expensebudgetsadd.component';
import { Cnorcneegstmodel } from 'src/app/models/cnorcneegstmodel';
import { PartygroupmasterlistComponent } from './module/partygroup/partygroupmasterlist/partygroupmasterlist.component';
import { PartygroupmasteraddComponent } from './module/partygroup/partygroupmasteradd/partygroupmasteradd.component';
import { Partygroupmastermodel } from './models/partygroupmastermodel';
import { MonthlystatementrptComponent } from './module/monthlystatementrpt/monthlystatementrpt.component';
import { Vehiclefrtoutstandingrptmodel } from './models/vehiclefrtoutstandingrptmodel';
import { VehiclefrtoutstandingrptComponent } from './module/vehiclefrtoutstandingrpt/vehiclefrtoutstandingrpt.component';
import { Lhextrapmtreconrptmodel } from './models/lhextrapmtreconrptmodel';
import { AdditionalcostrecmasterModel } from './models/additionalcostrecmastermodel';
import { LhextrapmtreconrptComponent } from './module/lhextrapmtreconrpt/lhextrapmtreconrpt.component';
import { SubledgermasteraddComponent } from './module/subledgermaster/subledgermasteradd/subledgermasteradd.component';
import { SubledgermasterlistComponent } from './module/subledgermaster/subledgermasterlist/subledgermasterlist.component';
import { Tripoutstandingrptmodel } from './models/tripoutstandingrptmodel';
import { Tripoutstandingrptbrplmodel } from './models/tripoutstandingrptbrplmodel';
import { TripoutstandingrptComponent } from './module/tripoutstandingrpt/tripoutstandingrpt.component';
import { BillsubmitmasteraddComponent } from './module/billsubmitmaster/billsubmitmasteradd/billsubmitmasteradd.component';
import { BillsubmitmasterlistComponent } from './module/billsubmitmaster/billsubmitmasterlist/billsubmitmasterlist.component';
import { BillsuppliaddComponent } from './module/billsuppli/billsuppliadd/billsuppliadd.component';
import { BillsupplilistComponent } from './module/billsuppli/billsupplilist/billsupplilist.component';
import { AdditionalcostrecmasteraddComponent } from './module/additionalcostrec/additionalcostrecmasteradd/additionalcostrecmasteradd.component';
import { AdditionalcostrecmasterlistComponent } from './module/additionalcostrec/additionalcostrecmasterlist/additionalcostrecmasterlist.component';
import { BilloutstandingrptComponent } from './module/billoutstandingrpt/billoutstandingrpt.component';
import { Lrcostingrptmodel } from './models/lrcostingrptmodel';
import { LrcostingrptComponent } from './module/lrcostingrpt/lrcostingrpt.component';
import { TripsummaryrptComponent } from './module/tripsummaryrpt/tripsummaryrpt.component';
import { Onaccountmrstatusrptmodel } from './models/onaccountmrstatusrptmodel';
import { OnaccountmrstatusrptComponent } from './module/onaccountmrstatusrpt/onaccountmrstatusrpt.component';
import { Addcostrecorveryrptmodel } from './models/addcostrecorveryrptmodel';
import { AddcostrecorveryrptComponent } from './module/addcostrecorveryrpt/addcostrecorveryrpt.component';
import { FasttagaddComponent } from './module/fasttag/fasttagadd/fasttagadd.component';
import { FasttaglistComponent } from './module/fasttag/fasttaglist/fasttaglist.component';
import { Fasttagmodel } from './models/fasttagmodel';
import { AddcostrecentrylistComponent } from './module/addcostrecentry/addcostrecentrylist/addcostrecentrylist.component';
import { AddcostrecentryaddComponent } from './module/addcostrecentry/addcostrecentryadd/addcostrecentryadd.component';
import { Addcostrecmstmodel } from './models/addcostrecmstmodel';
import { TripenroutebycompanyaddComponent } from './module/tripenroutebycompany/tripenroutebycompanyadd/tripenroutebycompanyadd.component';
import { TripenroutebycompanylistComponent } from './module/tripenroutebycompany/tripenroutebycompanylist/tripenroutebycompanylist.component';
import { BusinesssummrptComponent } from './module/businesssummrpt/businesssummrpt.component';
import { Businesssummrptmodel } from './models/businesssummrptmodel';
import { ChallanenquiryComponent } from './module/challanenqiry/challanenquiry/challanenquiry.component';
import { MrenquiryComponent } from './module/mrenquiry/mrenquiry/mrenquiry.component';
import { BillenquiryComponent } from './module/billenquiry/billenquiry/billenquiry.component';
import { ChallanreleaseaddComponent } from './module/challanrelease/challanreleaseadd/challanreleaseadd.component';
import { ChallanreleaselistComponent } from './module/challanrelease/challanreleaselist/challanreleaselist.component';
import { FastagdslrechargeentryaddComponent } from './module/fastagdslrechargeentry/fastagdslrechargeentryadd/fastagdslrechargeentryadd.component';
import { FastagdslrechargeentrylistComponent } from './module/fastagdslrechargeentry/fastagdslrechargeentrylist/fastagdslrechargeentrylist.component';
import { DriversalarypmtaddComponent } from './module/driversalarypayment/driversalarypmtadd/driversalarypmtadd.component';
import { DriversalarypmtlistComponent } from './module/driversalarypayment/driversalarypmtlist/driversalarypmtlist.component';
import { TripmasteraddComponent } from './module/tripmaster/tripmasteradd/tripmasteradd.component';
import { TripmasterlistComponent } from './module/tripmaster/tripmasterlist/tripmasterlist.component';
import { Tripmastermodel } from './models/tripmastermodel';
import { Fastagdslrechargeentrymodel } from 'src/app/models/fastagdslrechargeentrymodel';
import { SparesstockrptComponent } from './module/sparesstockrpt/sparesstockrpt.component';
import { SpareshistoryrptComponent } from './module/spareshistoryrpt/spareshistoryrpt.component';
import { PanwisetdsrateaddComponent } from './module/panwisetdsrate/panwisetdsrateadd/panwisetdsrateadd.component';
import { PanwisetdsratelistComponent } from './module/panwisetdsrate/panwisetdsratelist/panwisetdsratelist.component';
import { OutstandinganalysisrptComponent } from './module/outstandinganalysisrpt/outstandinganalysisrpt.component';
import { PendingdelvackrptComponent } from './module/pendingdelvackrpt/pendingdelvackrpt.component';
import { DprdashboardComponent } from './module/dprdashboard/dprdashboard.component';
import { BenbanklistComponent } from './module/benbanklist/benbanklist/benbanklist.component';
import { BenbanklistaddComponent } from './module/benbanklist/benbanklistadd/benbanklistadd.component';
import { Benbankmodel } from './models/benbankmodel';
import { VehiclesummmonthlyrptComponent } from './module/vehiclesummmonthlyrpt/vehiclesummmonthlyrpt.component';
import { EwaybillextensionbulkComponent } from './module/ewaybillextensionbulk/ewaybillextensionbulk.component';
import { LhpaymentsummrptComponent } from './module/lhpaymentsummrpt/lhpaymentsummrpt.component';
import { DoentrylistComponent } from './module/doentry/doentrylist/doentrylist.component';
import { DoentryaddComponent } from './module/doentry/doentryadd/doentryadd.component';
import { Domodel } from './models/domodel';
import { DovehiplacedlistComponent } from './module/dovehiplaced/dovehiplacedlist/dovehiplacedlist.component';
import { DovehiplacedaddComponent } from './module/dovehiplaced/dovehiplacedadd/dovehiplacedadd.component';
import { DovehiplacededitComponent } from './module/dovehiplaced/dovehiplacededit/dovehiplacededit.component';
import { Dovehiplacedmodel } from './models/dovehiplacedmodel';
import { VehicleadvbalrptComponent } from './module/vehicleadvbalrpt/vehicleadvbalrpt.component';
import { DetentionrptComponent } from './module/detentionrpt/detentionrpt.component';
import { DeductionrptComponent } from './module/deductionrpt/deductionrpt.component';
import { MissingdocrptComponent } from './module/missingdocrpt/missingdocrpt.component';
import { DashboardnccComponent } from './module/dashboardncc/dashboardncc.component';
import { GstpctvalueslistComponent } from './module/gstpctvalues/gstpctvalueslist/gstpctvalueslist.component';
import { GstpctvaluesaddComponent } from './module/gstpctvalues/gstpctvaluesadd/gstpctvaluesadd.component';
import { RatesmasternewaddComponent } from './module/ratesmasternew/ratesmasternewadd/ratesmasternewadd.component';
import { RatesmasternewlistComponent } from './module/ratesmasternew/ratesmasternewlist/ratesmasternewlist.component';
import { Ratesmasternewmodel } from './models/ratesmasternewmodel';
import { DovehicleinlistComponent } from './module/dovehiclein/dovehicleinlist/dovehicleinlist.component';
import { DovehicleinaddComponent } from './module/dovehiclein/dovehicleinadd/dovehicleinadd.component';
import { DovehicleineditComponent } from './module/dovehiclein/dovehicleinedit/dovehicleinedit.component';
import { Dovehicleinmodel } from './models/dovehicleinmodel';
import { ChcosttypesaddComponent } from './module/chcosttypes/chcosttypesadd/chcosttypesadd.component';
import { ChcosttypeslistComponent } from './module/chcosttypes/chcosttypeslist/chcosttypeslist.component';
import { ChcosttypesModel } from './models/chcosttypesmodel';
import { DotempgclistComponent } from './module/dotempgc/dotempgclist/dotempgclist.component';
import { DotempgcaddComponent } from './module/dotempgc/dotempgcadd/dotempgcadd.component';
import { DotempgceditComponent } from './module/dotempgc/dotempgcedit/dotempgcedit.component';
import { Dotempgcmodel } from './models/dotempgcmodel';
import { ThreedecimalonlyDirective } from './directives/threedecimalonly.directive';
import { DocallotmentllplistComponent } from './module/docallotmentllp/docallotmentllplist/docallotmentllplist.component';
import { DocallotmentllpaddComponent } from './module/docallotmentllp/docallotmentllpadd/docallotmentllpadd.component';
import { ConsignmentllplistComponent } from './module/consignmentllp/consignmentllplist/consignmentllplist.component';
import { ConsignmentllpaddComponent } from './module/consignmentllp/consignmentllpadd/consignmentllpadd.component';
import { ConsignmentllpupdateComponent } from './module/consignmentllp/consignmentllpupdate/consignmentllpupdate.component';
import { FreightgstmasteraddComponent } from './module/freightgstmaster/freightgstmasteradd/freightgstmasteradd.component';
import { FreightgstmasterlistComponent } from './module/freightgstmaster/freightgstmasterlist/freightgstmasterlist.component';
import { Freightgstmastermodel } from './models/freightgstmastermodel';
import { Ccinvmstmodel } from './models/cciInvmstmodel';
import { Freightgstmasterlistmodel } from './models/freightgstmasterlistmodel';
import { CciinvoicemstaddComponent } from './module/cciinvoice/cciinvoicemstadd/cciinvoicemstadd.component';
import { CciinvoicemstlistComponent } from './module/cciinvoice/cciinvoicemstlist/cciinvoicemstlist.component';
import { ChallanmasterllpaddComponent } from './module/challanmasterllp/challanmasterllpadd/challanmasterllpadd.component';
import { ChallanmasterlistllpComponent } from './module/challanmasterllp/challanmasterlistllp/challanmasterlistllp.component';
import { ChallanmastermodelllP } from './models/challanmastermodelllp';
import { BillsmasterlistllpComponent } from './module/billsmasterllp/billsmasterlistllp/billsmasterlistllp.component';
import { BillsmasteraddllpComponent } from './module/billsmasterllp/billsmasteraddllp/billsmasteraddllp.component';
import { BillsmastermodelllP } from './models/billsmastermodelllp';
import { BillsDetailModelllP } from './models/billsdetailmodelllp';
import { Billsmasterlistmodel } from './models/billsmasterlistmodel';
import { VehicleadvbalreceiptModelLLP } from 'src/app/models/vehicleadvreceiptmodelllp';
import { BillsuppliaddllpComponent } from './module/billsupplillp/billsuppliaddllp/billsuppliaddllp.component';
import { BillsupplilistllpComponent } from './module/billsupplillp/billsupplilistllp/billsupplilistllp.component';
import { DeliverydisputeentryaddComponent } from './module/deliverydisputeentry/deliverydisputeentryadd/deliverydisputeentryadd.component';
import { DeliverydisputeentrylistComponent } from './module/deliverydisputeentry/deliverydisputeentrylist/deliverydisputeentrylist.component';
import { VehicleengagementrptComponent } from './module/vehicleengagementrpt/vehicleengagementrpt.component';
import { BillprintllpComponent } from './module/billprintllp/billprintllp.component';
import { AdminmastergroupaddComponent } from './module/admingroupmaster/adminmastergroupadd/adminmastergroupadd.component';
import { AdminmastergrouplistComponent } from './module/admingroupmaster/adminmastergrouplist/adminmastergrouplist.component';
import { BranchcustomermstaddComponent } from './module/branchcustomertarget/branchcustomermstadd/branchcustomermstadd.component';
import { BranchcustomertarmstlistComponent } from './module/branchcustomertarget/branchcustomertarmstlist/branchcustomertarmstlist.component';
import { BillgstrptComponent } from './module/billgstrpt/billgstrpt.component';
import { TrippaymentsllpaddComponent } from './module/trippaymentsllp/trippaymentsllpadd/trippaymentsllpadd.component';
import { TrippaymentsllplistComponent } from './module/trippaymentsllp/trippaymentsllplist/trippaymentsllplist.component';
import { VehicleinstpmtllpaddComponent } from './module/vehicleinstpmtllp/vehicleinstpmtllpadd/vehicleinstpmtllpadd.component';
import { VehicleinstpmtllplistComponent } from './module/vehicleinstpmtllp/vehicleinstpmtllplist/vehicleinstpmtllplist.component';
import { ChallansupplilistComponent } from './module/challansuppli/challansupplilist/challansupplilist.component';
import { ChallansuppliaddComponent } from './module/challansuppli/challansuppliadd/challansuppliadd.component';
import { BrokeradvancepmtaddComponent } from './module/brokeradvancepmt/brokeradvancepmtadd/brokeradvancepmtadd.component';
import { BrokeradvancepmtlistComponent } from './module/brokeradvancepmt/brokeradvancepmtlist/brokeradvancepmtlist.component';
import { CashbookrptComponent } from './module/cashbookrpt/cashbookrpt.component';
import { LedgerreportComponent } from './module/ledgerreport/ledgerreport.component';
import { DeliverydisputerptComponent } from './module/deliverydisputerpt/deliverydisputerpt.component';
import { PartymisrptComponent } from './module/partymisrpt/partymisrpt.component';
import { PartymislocationsaddComponent } from './module/partymislocations/partymislocationsadd/partymislocationsadd.component';
import { PartymislocationlistComponent } from './module/partymislocations/partymislocationlist/partymislocationlist.component';
import { OpeningbalupdateComponent } from './module/openingbalupdate/openingbalupdate/openingbalupdate.component';
import { BillinterestlossrptComponent } from './module/billinterestlossrpt/billinterestlossrpt.component';
import { BrokerledgerprtComponent } from './module/brokerledgerprt/brokerledgerprt.component';
import { DirectpmtdownloadComponent } from './module/directpmt/directpmtdownload/directpmtdownload.component';
import { DirectpmtupdateComponent } from './module/directpmt/directpmtupdate/directpmtupdate.component';
import { Directpmtlistmodel } from './models/directpmtlistmodel';
import { Directpmtmodel } from './models/directpmtmodel';
import { UnbilledprovisionmstmodeladdComponent } from './module/unbilledprovisionmst/unbilledprovisionmstmodeladd/unbilledprovisionmstmodeladd.component';
import { UnbilledprovisionmstmodellistComponent } from './module/unbilledprovisionmst/unbilledprovisionmstmodellist/unbilledprovisionmstmodellist.component';
import { MultipleledgerreportComponent } from './module/multipleledgerreport/multipleledgerreport/multipleledgerreport.component';
import { AnnexurereportComponent } from './module/annexurereport/annexurereport/annexurereport.component';
import { LorryhirepmtllpaddComponent } from './module/lorryhiremptllp/lorryhirepmtllpadd/lorryhirepmtllpadd.component';
import { LorryhirepmtllplistComponent } from './module/lorryhiremptllp/lorryhirepmtllplist/lorryhirepmtllplist.component';
import { VehicleadvreceiptllpaddComponent } from './module/vehicleadvreceiptllp/vehicleadvreceiptllpadd/vehicleadvreceiptllpadd.component';
import { VehicleadvreceiptllplistComponent } from './module/vehicleadvreceiptllp/vehicleadvreceiptllplist/vehicleadvreceiptllplist.component';
import { ChallansuppliaddllpComponent } from './module/challansupplillp/challansuppliaddllp/challansuppliaddllp.component';
import { ChallansupplilistllpComponent } from './module/challansupplillp/challansupplilistllp/challansupplilistllp.component';
import { TripoutstandingrptbrplComponent } from './module/tripoutstandingrptbrpl/tripoutstandingrptbrpl/tripoutstandingrptbrpl.component';
import { ChallantdsstmtrptComponent } from './module/challantdsstmtrpt/challantdsstmtrpt/challantdsstmtrpt.component';
import { DashboardbrplComponent } from './module/dashboardbrpl/dashboardbrpl.component';
import { VendorpmtlistComponent } from './module/vendorpmt/vendorpmtlist/vendorpmtlist.component';
import { VendorpmtaddComponent } from './module/vendorpmt/vendorpmtadd/vendorpmtadd.component';
import { Vendorpmtmodel } from './models/vendorpmtmodel';
import { VendorduerptlistComponent } from './module/vendorduerpt/vendorduerptlist/vendorduerptlist.component';


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
    EmpmasterlistComponent,EmpmasteraddComponent,
    EmpsalarylistComponent, EmpsalaryaddComponent,
    EmploanlistComponent, EmploanaddComponent,
    EmploanrepaylistComponent, EmploanrepayaddComponent,
    TripstatusrptComponent, 
    HappaystatementlistComponent,  HappaystatementaddComponent,
    EmppaygenerationlistComponent, 
    EmpsalcalculationlistComponent,EmpsalcalculationaddComponent,
    CustwizardaddComponent, 
    DailyloadingrptComponent,TripsummaryrptComponent,
    LedgerrptComponent, BankbookrptComponent,ConsolidatedopenbalComponent,
    EwaybillexprptComponent, GstsalesregisterrptlistComponent,    
    DrpmasteraddComponent, DrpmasterlistComponent,
    DprvehiplacedlistComponent, DprvehiplacedaddComponent,DprvehiplacededitComponent,
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
    BalanacerptComponent,VehicleinstpmtaddComponent, VehicleinstpmtlistComponent,
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
    GeneratetempgceditComponent, SparespurchaserptComponent, 
    LhpayablestatusrptComponent,  ChallanregisterrptComponent,
    VehiclerepairsrptComponent,  BillregisterrptComponent,
    MrregisterrptComponent,  BenificiarymasteraddComponent,
    BenificiarymasterlistComponent,
    CnorcneemasterlistComponent, CnorcneemasteraddComponent, 
    LhpmvariancerptComponent, GstregisterrptComponent ,
    CnorcneegstaddComponent, CnorcneegstlistComponent, 
    DieselstmtrptComponent ,
    ExpensebudgetsaddComponent, MonthlystatementrptComponent ,  
    PartygroupmasterlistComponent,PartygroupmasteraddComponent,
    VehiclefrtoutstandingrptComponent, LhextrapmtreconrptComponent,
    SubledgermasteraddComponent, SubledgermasterlistComponent,
    BillsubmitmasteraddComponent, BillsubmitmasterlistComponent,
    BillsuppliaddComponent, BillsupplilistComponent,
    AdditionalcostrecmasteraddComponent, AdditionalcostrecmasterlistComponent,
    BilloutstandingrptComponent,TripoutstandingrptComponent,
    LrcostingrptComponent, OnaccountmrstatusrptComponent, 
    AddcostrecorveryrptComponent, BusinesssummrptComponent,
    FasttagaddComponent, FasttaglistComponent, 
    AddcostrecentrylistComponent, AddcostrecentryaddComponent, 
    TripenroutebycompanyaddComponent, TripenroutebycompanylistComponent, 
    ChallanenquiryComponent, MrenquiryComponent, BillenquiryComponent, 
    ChallanreleaseaddComponent, ChallanreleaselistComponent,
    FastagdslrechargeentryaddComponent, FastagdslrechargeentrylistComponent, 
    DriversalarypmtaddComponent, DriversalarypmtlistComponent,
     TripmasteraddComponent, TripmasterlistComponent, 
     SparesstockrptComponent, SpareshistoryrptComponent, 
     PanwisetdsrateaddComponent, PanwisetdsratelistComponent,
     OutstandinganalysisrptComponent, PendingdelvackrptComponent, DprdashboardComponent,
     BenbanklistComponent, BenbanklistaddComponent,
     VehiclesummmonthlyrptComponent,  EwaybillextensionbulkComponent, LhpaymentsummrptComponent,
     DoentrylistComponent,DoentryaddComponent,
     DovehiplacedlistComponent, DovehiplacedaddComponent,DovehiplacededitComponent, 
     VehicleadvbalrptComponent, DetentionrptComponent, DeductionrptComponent, 
     MissingdocrptComponent, DashboardnccComponent,    
    GstpctvaluesaddComponent,  GstpctvalueslistComponent, 
    RatesmasternewaddComponent ,RatesmasternewlistComponent,
    DovehicleinlistComponent,DovehicleinaddComponent ,DovehicleineditComponent, 
    ChcosttypesaddComponent, ChcosttypeslistComponent,
    DocallotmentllplistComponent, DocallotmentllpaddComponent, 
    ConsignmentllplistComponent, ConsignmentllpaddComponent, ConsignmentllpupdateComponent,    
    AdminmastergroupaddComponent, AdminmastergrouplistComponent, 
    BranchcustomermstaddComponent, BranchcustomertarmstlistComponent, 
    DotempgclistComponent, DotempgcaddComponent, DotempgceditComponent, ThreedecimalonlyDirective, 
    FreightgstmasteraddComponent, FreightgstmasterlistComponent, 
    CciinvoicemstaddComponent, CciinvoicemstlistComponent, 
    ChallanmasterllpaddComponent, ChallanmasterlistllpComponent, 
    BillsmasterlistllpComponent, BillsmasteraddllpComponent, 
    BillsuppliaddllpComponent, BillsupplilistllpComponent, 
    DeliverydisputeentryaddComponent, DeliverydisputeentrylistComponent, 
    VehicleengagementrptComponent, BillprintllpComponent, BillgstrptComponent, 
    TrippaymentsllpaddComponent, TrippaymentsllplistComponent, 
    VehicleinstpmtllpaddComponent, VehicleinstpmtllplistComponent, 
    ChallansupplilistComponent, ChallansuppliaddComponent, 
    BrokeradvancepmtaddComponent,BrokeradvancepmtlistComponent,
    CashbookrptComponent, LedgerreportComponent,
    DeliverydisputerptComponent,     
    PartymislocationsaddComponent,PartymislocationlistComponent, 
    OpeningbalupdateComponent, 
    PartymisrptComponent, BillinterestlossrptComponent, 
    BrokerledgerprtComponent, DirectpmtdownloadComponent, DirectpmtupdateComponent,
    PartymisrptComponent, OpeningbalupdateComponent, 
    PartymisrptComponent, BillinterestlossrptComponent, BrokerledgerprtComponent, 
    UnbilledprovisionmstmodeladdComponent, UnbilledprovisionmstmodellistComponent, 
    MultipleledgerreportComponent, AnnexurereportComponent, 
    LorryhirepmtllpaddComponent, LorryhirepmtllplistComponent, 
    VehicleadvreceiptllpaddComponent, VehicleadvreceiptllplistComponent, 
    ChallansuppliaddllpComponent, ChallansupplilistllpComponent, 
    TripoutstandingrptbrplComponent, ChallantdsstmtrptComponent, DashboardbrplComponent, VendorpmtlistComponent, VendorpmtaddComponent, VendorduerptlistComponent,  
    
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
  
  providers: [DatePipe,Loginmodel, Usermodel, Destinationmodel, 
    Productgroupmastermodel, Productmastermodel, 
    Brandmastermodel, Tyrepositionmastermodel, Docrenewalmastermodel, Ratetypesmodel, 
    Lrbillseriesmodel, Vehicletypemastermodel, Vehicletypegroupmastermodel, Consignmentmodel, 
    Branchmodel, Vehiclefltmastermodel, Cnorcneemastermodel, 
    Trippaymentsmodel, Drivermodel, Docrenewalentrymodel, 
    Intermediatescreenmodel,Tripsheetmodel,
    Distancemasterfreightmodel,Distancefreighteditmodel,
    Distancemastertripmodel,Distancetripeditmodel,
    bankreceiptentrymodel,Ratesmastermodel,
    Dieselstatementlistmodel, Dieselstatementmodel, Deliveryackpodmodel,
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
    Driverlicrptmodel,Tripstatusrptmodel,
    Custwizardmodel,Gstsalesregisterrptmodel,Truckmastermodel,Classificationmastermodel,
    Tyremodelmastermodel,Vehicleinstschedulemodel,Transportmastermodel,
    Documentallotmentmodel,Consignmentupdatemodel,Spareslubesmastermodel,Maintanencemastermodel,
    Billsmastermodel,Billstypemodel, Companyinfomodel, Mrmodel,Vehicleinstpmtmodel,
    Tyrepurchasemastermodel,Tyreactivatemastermodel,Tyredeactivatemastermodel,
    Tyreregroupissuemastermodel, Tyreregrouprecdmastermodel,
    Fleetloadentrymodel,Lhpmslabmastermodel,
    Finaccountsmastergstmodel,TripexptypemasterModel,
    Sparespurchasemastermodel,VehiclerepmaintMaster,VehicleadvbalreceiptModel,
    Lhpayablestatusrptmodel,Challanregisterrptmodel, Vehiclerepairsrptmodel,
    Billregisterrptmodel, Mrregisterrptmodel, Lhpmvariancerptmodel, Gstregisterrptmodel,
    Vehiclefrtoutstandingrptmodel, Lhextrapmtreconrptmodel, 
    Expensebudgetlistmodel, Cnorcneegstmodel,
    Partygroupmastermodel,Subledgermodel,Billsubmitmastermodel,AdditionalcostrecmasterModel,
    Benificiarymastermodel,Cnorcneemastermodel,Tripoutstandingrptmodel,Lrcostingrptmodel,
    Onaccountmrstatusrptmodel,Addcostrecorveryrptmodel,
    Fasttagmodel,Addcostrecmstmodel,TripenrouteexpbycompanyModel,Panwisetdsratemodel,
    Businesssummrptmodel,ChallanreleaseModel,Fastagdslrechargeentrymodel,Driversalarypaymentmodel,
    Tripmastermodel,Benbankmodel,Domodel,Dovehiplacedmodel,Gstpctvaluesmodel,Ratesmasternewmodel,
    Ccinvmstmodel, Dovehicleinmodel,Dotempgcmodel,ChcosttypesModel,
    Freightgstmastermodel,Freightgstmasterlistmodel,
    ChallanmastermodelllP,ChallanlistmodelllP,Branchcustomertargetmodel,    
    Tripmastermodel,Benbankmodel,Domodel,Dovehiplacedmodel,Gstpctvaluesmodel,
    Ccinvmstmodel,Admingroupmastermodel,Userlistmodel,Ccinvdetailmodel,
    BillsmastermodelllP,Billsmasterlistmodel,BillsDetailModelllP,
    Deliverydisputeentrymodel,BrokeradvancepmtModel,Partymislocationmodel,
    Directpmtlistmodel, Directpmtmodel,VehicleadvbalreceiptModelLLP,Tripoutstandingrptbrplmodel,
    Unbilledprovisionmstmodel,Menureportaccessrightsmodel,
    Vendorpmtmodel,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
