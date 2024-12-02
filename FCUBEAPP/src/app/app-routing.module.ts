import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { LoginComponent } from './module/login/login.component';
import { UserlistComponent } from './module/user/userlist/userlist.component';
import { UseraddComponent } from './module/user/useradd/useradd.component';
import { AdddestinationComponent } from './module/destination/adddestination/adddestination.component';
import { DestinationlistComponent } from './module/destination/destinationlist/destinationlist.component';
import { ProductgroupmasterlistComponent } from './module/productgroupmaster/productgroupmasterlist/productgroupmasterlist.component';
import { AddproductgroupmasterComponent } from './module/productgroupmaster/addproductgroupmaster/addproductgroupmaster.component';
import { ProductmasterlistComponent } from './module/productmaster/productmasterlist/productmasterlist.component';
import { AddproductmasterComponent } from './module/productmaster/addproductmaster/addproductmaster.component';
import { AddbrandmasterComponent } from './module/brandmaster/addbrandmaster/addbrandmaster.component';
import { BrandmasterlistComponent } from './module/brandmaster/brandmasterlist/brandmasterlist.component';
import { AddfleetcardmasterComponent } from './module/fleetcardmaster/addfleetcardmaster/addfleetcardmaster.component';
import { FleetcardmasterlistComponent } from './module/fleetcardmaster/fleetcardmasterlist/fleetcardmasterlist.component';
import { TyrepositionmasterlistComponent } from './module/tyrepositionmaster/tyrepositionmasterlist/tyrepositionmasterlist.component';
import { AddtyrepositionmasterComponent } from './module/tyrepositionmaster/addtyrepositionmaster/addtyrepositionmaster.component';
import { DocrenewalmasterlistComponent } from './module/docrenewalmaster/docrenewalmasterlist/docrenewalmasterlist.component';
import { AdddocrenewalmasterComponent } from './module/docrenewalmaster/adddocrenewalmaster/adddocrenewalmaster.component';
import { RatetypeslistComponent } from './module/ratetypes/ratetypeslist/ratetypeslist.component';
import { AddratetypesComponent } from './module/ratetypes/addratetypes/addratetypes.component';
import { AddroletypeComponent } from './module/roletype/addroletype/addroletype.component';
import { RoletypelistComponent } from './module/roletype/roletypelist/roletypelist.component';
import { AddhrmasterComponent } from './module/hrmaster/addhrmaster/addhrmaster.component';
import { HrmasterlistComponent } from './module/hrmaster/hrmasterlist/hrmasterlist.component';
import { OpbrsentrylistComponent } from './module/opbrsentry/opbrsentrylist/opbrsentrylist.component';
import { AddbrsentryComponent } from './module/opbrsentry/addbrsentry/addbrsentry.component';
import { AddlrbillseriesComponent } from './module/lrbillseries/addlrbillseries/addlrbillseries.component';
import { LrbillserieslistComponent } from './module/lrbillseries/lrbillserieslist/lrbillserieslist.component';
import {AddvehicletypemasterComponent} from './module/vehicletypemaster/addvehicletypemaster/addvehicletypemaster.component';
import {AddvehicletypegroupmasterComponent} from './module/vehicletypegroupmaster/addvehicletypegroupmaster/addvehicletypegroupmaster.component';
import { VehicletypemasterlistComponent } from './module/vehicletypemaster/vehicletypemasterlist/vehicletypemasterlist.component';
import { VehicletypegroupmasterlistComponent } from './module/vehicletypegroupmaster/vehicletypegroupmasterlist/vehicletypegroupmasterlist.component';
import { RatesmasterlistComponent } from './module/ratesmaster/ratesmasterlist/ratesmasterlist.component';
import { AddratesmasterComponent } from './module/ratesmaster/addratesmaster/addratesmaster.component';
import { ConsignmentlistComponent } from './module/consignment/consignmentlist/consignmentlist.component';
import { ConsignmentaddComponent } from './module/consignment/consignmentadd/consignmentadd.component';
import { BranchmasterlistComponent } from './module/branchmaster/branchmasterlist/branchmasterlist.component';
import { AddbranchmasterComponent } from './module/branchmaster/addbranchmaster/addbranchmaster.component';
import { VehiclemasterlistComponent } from './module/vehiclemaster/vehiclemasterlist/vehiclemasterlist.component';
import { VehiclemasteraddComponent } from './module/vehiclemaster/vehiclemasteradd/vehiclemasteradd.component';
import { DrivermasterlistComponent } from './module/drivermaster/drivermasterlist/drivermasterlist.component';
import { DrivermasteraddComponent } from './module/drivermaster/drivermasteradd/drivermasteradd.component';
import { TrippaymentslistComponent } from './module/trippayments/trippaymentslist/trippaymentslist.component';
import { AddtrippaymentsComponent } from './module/trippayments/addtrippayments/addtrippayments.component';
import { GstpurchaselistComponent } from './module/gstpurchase/gstpurchaselist/gstpurchaselist.component';
import { GstpurchaseaddComponent } from './module/gstpurchase/gstpurchaseadd/gstpurchaseadd.component';
import { DocrenewalentrylistComponent } from './module/docrenewalentry/docrenewalentrylist/docrenewalentrylist.component';
import { AdddocrenewalentryComponent } from './module/docrenewalentry/adddocrenewalentry/adddocrenewalentry.component';
import { CashreceiptentrylistComponent } from './module/cashreceiptentry/cashreceiptentrylist/cashreceiptentrylist.component';
import { AddcashreceiptentryComponent } from './module/cashreceiptentry/addcashreceiptentry/addcashreceiptentry.component';
import { BankreceiptentrylistComponent } from './module/bankreceiptentry/bankreceiptentrylist/bankreceiptentrylist.component';
import { AddbankreceiptentryComponent } from './module/bankreceiptentry/addbankreceiptentry/addbankreceiptentry.component';
import { IntermediatescreenComponent } from './module/intermediatescreen/intermediatescreen.component';
import { TripsheetlistComponent } from './module/tripsheet/tripsheetlist/tripsheetlist.component';
import { TripsheetaddComponent } from './module/tripsheet/tripsheetadd/tripsheetadd.component';
import { DistancemasterfreightlistComponent } from './module/distancemasterfreight/distancemasterfreightlist/distancemasterfreightlist.component';
import { DistancemasterfreightaddComponent } from './module/distancemasterfreight/distancemasterfreightadd/distancemasterfreightadd.component';
import { DistancemastertriplistComponent } from './module/distancemastertrip/distancemastertriplist/distancemastertriplist.component';
import { DistancemastertripaddComponent } from './module/distancemastertrip/distancemastertripadd/distancemastertripadd.component';
import { BankcashcontralistComponent } from './module/bankcashcontra/bankcashcontralist/bankcashcontralist.component';
import { AddbankcashcontraComponent } from './module/bankcashcontra/addbankcashcontra/addbankcashcontra.component';
import { JournalentrylistComponent } from './module/journalentry/journalentrylist/journalentrylist.component';
import { AddjournalentryComponent } from './module/journalentry/addjournalentry/addjournalentry.component';
import { DieselstatementaddComponent } from './module/dieselstatement/dieselstatementadd/dieselstatementadd.component';
import { DieselstatementlistComponent } from './module/dieselstatement/dieselstatementlist/dieselstatementlist.component';
import { DriversalarystatementaddComponent } from './module/driversalarystatement/driversalarystatementadd/driversalarystatementadd.component';
import { DriversalarystatementlistComponent } from './module/driversalarystatement/driversalarystatementlist/driversalarystatementlist.component';
import { FingrouplistComponent } from './module/fingroup/fingrouplist/fingrouplist.component';
import { FingroupaddComponent } from './module/fingroup/fingroupadd/fingroupadd.component';
import { FinaccountsmasterlistComponent } from './module/finaccountsmaster/finaccountsmasterlist/finaccountsmasterlist.component';
import { FinaccountsmasteraddComponent } from './module/finaccountsmaster/finaccountsmasteradd/finaccountsmasteradd.component';
import { FinopenbalancelistComponent } from './module/finopenbalance/finopenbalancelist/finopenbalancelist.component';
import { FinopenbalanceaddComponent } from './module/finopenbalance/finopenbalanceadd/finopenbalanceadd.component';
import { BankreconcilationComponent } from './module/bankreconcilation/bankreconcilation.component';
import { DistancefreighteditComponent } from './module/distancemasterfreight/distancefreightedit/distancefreightedit.component';
import { DistancetripeditComponent } from './module/distancemastertrip/distancetripedit/distancetripedit.component';
import { EwaybillextensionlistComponent } from './module/ewaybillextension/ewaybillextensionlist/ewaybillextensionlist.component';
import { EwaybillextensionaddComponent } from './module/ewaybillextension/ewaybillextensionadd/ewaybillextensionadd.component';
import { ChangepasswordComponent } from './module/password/changepassword/changepassword.component';
import { RoleprivilegesComponent } from './module/roleprivileges/roleprivileges.component';
import { PtslabmasterlistComponent } from './module/ptslabmaster/ptslabmasterlist/ptslabmasterlist.component';
import { AddptslabmasterComponent } from './module/ptslabmaster/addptslabmaster/addptslabmaster.component';
import { ExptruckarrivalreportComponent } from './module/exptruckarrivalreport/exptruckarrivalreport.component';
import { CashbookreportComponent } from './module/cashbookreport/cashbookreport.component';
import { DocrenewalrptComponent } from './module/docrenewalrpt/docrenewalrpt/docrenewalrpt.component';
import { TripstatusrptComponent } from './module/tripstatusrpt/tripstatusrpt.component';
import { DriverlicrptComponent } from './module/driverlicrpt/driverlicrpt/driverlicrpt.component';
import { TrippaymentsrptComponent } from './module/trippaymentsrpt/trippaymentsrpt/trippaymentsrpt.component';
import { DistancemasterfrtrptComponent } from './module/distancemasterfrtrpt/distancemasterfrtrpt/distancemasterfrtrpt.component';
import { DistancemastertriprptComponent } from './module/distancemastertriprpt/distancemastertriprpt/distancemastertriprpt.component';
import { EmpmasterlistComponent } from './module/empmaster/empmasterlist/empmasterlist.component';
import { EmpmasteraddComponent } from './module/empmaster/empmasteradd/empmasteradd.component';
import { EmpsalarylistComponent } from './module/empsalary/empsalarylist/empsalarylist.component';
import { EmpsalaryaddComponent } from './module/empsalary/empsalaryadd/empsalaryadd.component';
import { EmploanlistComponent } from './module/emploan/emploanlist/emploanlist.component';
import { EmploanaddComponent } from './module/emploan/emploanadd/emploanadd.component';
import { EmploanrepaylistComponent } from './module/emploanrepay/emploanrepaylist/emploanrepaylist.component';
import { EmploanrepayaddComponent } from './module/emploanrepay/emploanrepayadd/emploanrepayadd.component';
import { ChangebranchComponent } from './module/branch/changebranch/changebranch.component';
import { HappaystatementlistComponent } from './module/happaystatement/happaystatementlist/happaystatementlist.component';
import { HappaystatementaddComponent } from './module/happaystatement/happaystatementadd/happaystatementadd.component';
import { EmpsalcalculationlistComponent } from './module/empsalcalculation/empsalcalculationlist/empsalcalculationlist.component';
import { EmpsalcalculationaddComponent } from './module/empsalcalculation/empsalcalculationadd/empsalcalculationadd.component';
import { CustwizardaddComponent } from './module/custwizard/custwizardadd/custwizardadd.component';
import { DailyloadingrptComponent } from './module/dailyloadingrpt/dailyloadingrpt.component';
import { LedgerrptComponent } from './module/ledgerrpt/ledgerrpt.component';
import { BankbookrptComponent } from './module/bankbookrpt/bankbookrpt.component';
import { ConsolidatedopenbalComponent } from './module/consolidatedopenbal/consolidatedopenbal.component';
import { HappaystatementrptComponent } from './module/happaystatementrpt/happaystatementrpt.component';
import { GstsalesregisterrptlistComponent } from './module/gstsalesregisterrpt/gstsalesregisterrptlist/gstsalesregisterrptlist.component';
import { EwaybillexprptComponent } from './module/ewaybillexprpt/ewaybillexprpt.component';
import { DrpmasterlistComponent } from './module/dprmaster/dprmasterlist/dprmasterlist.component';
import { DrpmasteraddComponent } from './module/dprmaster/dprmasteradd/dprmasteradd.component';
import { TruckmasterlistComponent } from './module/truckmaster/truckmasterlist/truckmasterlist.component';
import { AddtruckmasterComponent } from './module/truckmaster/addtruckmaster/addtruckmaster.component';
import { DprvehiplacedlistComponent } from './module/dprvehiplaced/dprvehiplacedlist/dprvehiplacedlist.component';
import { DprvehiplacedaddComponent } from './module/dprvehiplaced/dprvehiplacedadd/dprvehiplacedadd.component';
import { GeneratetempgclistComponent } from './module/generatetempgc/generatetempgclist/generatetempgclist.component';
import { GeneratetempgcaddComponent } from './module/generatetempgc/generatetempgcadd/generatetempgcadd.component';
import { ClassificationmasterlistComponent } from './module/classificationmaster/classificationmasterlist/classificationmasterlist.component';
import { ClassificationmasteraddComponent } from './module/classificationmaster/classificationmasteradd/classificationmasteradd.component';
import { BillsmasterlistComponent } from './module/billsmaster/billsmasterlist/billsmasterlist.component';
import { BillsmasteraddComponent } from './module/billsmaster/billsmasteradd/billsmasteradd.component';
import { AddtransportmasterComponent } from './module/transportmaster/addtransportmaster/addtransportmaster.component';
import { TransportmasterlistComponent } from './module/transportmaster/transportmasterlist/transportmasterlist.component';
import { ChallanmasterlistComponent } from './module/challanmaster/challanmasterlist/challanmasterlist.component';
import { ChallanmasteraddComponent } from './module/challanmaster/challanmasteradd/challanmasteradd.component';
import { DeliveryackpodlistComponent } from './module/deliveryackpod/deliveryackpodlist/deliveryackpodlist.component';
import { DeliveryackpodaddComponent } from './module/deliveryackpod/deliveryackpodadd/deliveryackpodadd.component';
import { AdddocumentallottmentComponent } from './module/documentallotment/adddocumentallottment/adddocumentallottment.component';
import { Documentallottmentlistcomponent } from './module/documentallotment/documentallottmentlist/documentallottmentlist.component';
import { BilltypeaddComponent } from './module/billtypemaster/billtypeadd/billtypeadd.component';
import { BilltypelistComponent } from './module/billtypemaster/billtypelist/billtypelist.component';
import { ConsignmentupdateComponent } from './module/consignment/consignmentupdate/consignmentupdate.component';
import { LorryhirepmtlistComponent } from './module/lorryhirepmt/lorryhirepmtlist/lorryhirepmtlist.component';
import { LorryhirepmtaddComponent } from './module/lorryhirepmt/lorryhirepmtadd/lorryhirepmtadd.component';
import { LorryhirepmtreqaddComponent } from './module/lorryhirepmtreq/lorryhirepmtreqadd/lorryhirepmtreqadd.component';
import { LorryhirepmtreqlistComponent } from './module/lorryhirepmtreq/lorryhirepmtreqlist/lorryhirepmtreqlist.component';
import { LorryhirepmtaprvlistComponent } from './module/lorryhirepmtaprv/lorryhirepmtaprvlist/lorryhirepmtaprvlist.component';
import { LorryhirepmtaprvaddComponent } from './module/lorryhirepmtaprv/lorryhirepmtaprvadd/lorryhirepmtaprvadd.component';
import { SpareslubesmasteraddComponent } from './module/spareslubesmaster/spareslubesmasteradd/spareslubesmasteradd.component';
import { SpareslubesmasterlistComponent } from './module/spareslubesmaster/spareslubesmasterlist/spareslubesmasterlist.component';
import { TyremodeladdComponent } from './module/tyremodelmaster/tyremodeladd/tyremodeladd.component';
import { TyremodellistComponent } from './module/tyremodelmaster/tyremodellist/tyremodellist.component';
import { MaintanencemasteraddComponent } from './module/maintanencemaster/maintanencemasteradd/maintanencemasteradd.component';
import { MaintanencemasterlistComponent } from './module/maintanencemaster/maintanencemasterlist/maintanencemasterlist.component';
import { TyrepurchasemasteraddComponent } from './module/tyrepurchasemaster/tyrepurchasemasteradd/tyrepurchasemasteradd.component';
import { TyrepurchasemasterlistComponent } from './module/tyrepurchasemaster/tyrepurchasemasterlist/tyrepurchasemasterlist.component';
import { VehicleinstschedulelistComponent } from './module/vehicleinstschedule/vehicleinstschedulelist/vehicleinstschedulelist.component';
import { VehicleinstscheduleaddComponent } from './module/vehicleinstschedule/vehicleinstscheduleadd/vehicleinstscheduleadd.component';
import { BalanacerptComponent } from './module/balanacerpt/balanacerpt.component';
import { CompanyinfoaddComponent } from './module/companyinfo/companyinfoadd/companyinfoadd.component';
import { MraddComponent } from './module/moneyreceipt/mradd/mradd.component';
import { MrlistComponent } from './module/moneyreceipt/mrlist/mrlist.component';
import { VehicleinstpmtaddComponent } from './module/vehicleinstpmt/vehicleinstpmtadd/vehicleinstpmtadd.component';
import { VehicleinstpmtlistComponent } from './module/vehicleinstpmt/vehicleinstpmtlist/vehicleinstpmtlist.component';
import { TyreativatelistComponent } from './module/tyreactivate/tyreativatelist/tyreativatelist.component';
import { TyreativateaddComponent } from './module/tyreactivate/tyreativateadd/tyreativateadd.component';
import { TyredeativatelistComponent } from './module/tyredeactivate/tyredeativatelist/tyredeativatelist.component';
import { TyredeativateaddComponent } from './module/tyredeactivate/tyredeativateadd/tyredeativateadd.component';
import { TyreregroupissuelistComponent } from './module/tyreregroupissue/tyreregroupissuelist/tyreregroupissuelist.component';
import { TyreregroupissueaddComponent } from './module/tyreregroupissue/tyreregroupissueadd/tyreregroupissueadd.component';
import { TyreregrouprecdlistComponent } from './module/tyreregrouprecd/tyreregrouprecdlist/tyreregrouprecdlist.component';
import { TyreregrouprecdaddComponent } from './module/tyreregrouprecd/tyreregrouprecdadd/tyreregrouprecdadd.component';
import { FleetloadentryaddComponent } from './module/fleetloadentry/fleetloadentryadd/fleetloadentryadd.component';
import { FleetloadentrylistComponent } from './module/fleetloadentry/fleetloadentrylist/fleetloadentrylist.component';
import { DieselstmtlistComponent } from './module/dieselstmt/dieselstmtlist/dieselstmtlist.component';
import { DieselstmtaddComponent } from './module/dieselstmt/dieselstmtadd/dieselstmtadd.component';
import { TyresaleslistComponent } from './module/tyresales/tyresaleslist/tyresaleslist.component';
import { TyresalesaddComponent } from './module/tyresales/tyresalesadd/tyresalesadd.component';
import { LhpmslabmasteraddComponent } from './module/lhpmslabmaster/lhpmslabmasteradd/lhpmslabmasteradd.component';
import { LhpmslabmasterlistComponent } from './module/lhpmslabmaster/lhpmslabmasterlist/lhpmslabmasterlist.component';
import { FinaccountmastergstComponent } from './module/finaccountmastergst/finaccountmastergst.component';
import { TripexptypemasteraddComponent } from './module/tripexptypemaster/tripexptypemasteradd/tripexptypemasteradd.component';
import { TripexptypemasterlistComponent } from './module/tripexptypemaster/tripexptypemasterlist/tripexptypemasterlist.component';
import { BookingregisterComponent } from './module/bookingregister/bookingregister.component';
import { LrwithoutchallanrptComponent } from './module/lrwithoutchallanrpt/lrwithoutchallanrpt.component';
import { CnenquiryComponent } from './module/cnenquiry/cnenquiry.component';
import { SparespurchasemasteraddComponent } from './module/sparespurchasemaster/sparespurchasemasteradd/sparespurchasemasteradd.component';
import { SparespurchasemasterlistComponent } from './module/sparespurchasemaster/sparespurchasemasterlist/sparespurchasemasterlist.component';
import { UnbilledrptComponent } from './module/unbilledrpt/unbilledrpt.component';
import { TyrepurchaserptComponent } from './module/tyrepurchaserpt/tyrepurchaserpt.component';
import { TyrestockrptComponent } from './module/tyrestockrpt/tyrestockrpt.component';
import { TyrehistoryrptComponent } from './module/tyrehistoryrpt/tyrehistoryrpt.component';
import { TyreactiverptComponent } from './module/tyreactiverpt/tyreactiverpt.component';
import { TyreactivatedrptComponent } from './module/tyreactivatedrpt/tyreactivatedrpt.component';
import { TyredeactivatedrptComponent } from './module/tyredeactivatedrpt/tyredeactivatedrpt.component';
import { TyreregroupissrptComponent } from './module/tyreregroupissrpt/tyreregroupissrpt.component';
import { TyreregrouprcvdrptComponent } from './module/tyreregrouprcvdrpt/tyreregrouprcvdrpt.component';
import { DprplacevehicleComponent } from './module/dprvehiplaced/dprplacevehicle/dprplacevehicle.component';
import { GeneratetempgceditComponent } from './module/generatetempgc/generatetempgcedit/generatetempgcedit.component';
import { VehiclerepmaintaddComponent } from './module/vehiclerepmaint/vehiclerepmaintadd/vehiclerepmaintadd.component';
import { VehiclerepmaintlistComponent } from './module/vehiclerepmaint/vehiclerepmaintlist/vehiclerepmaintlist.component';
import { VehicleadvbalreceiptaddComponent } from './module/vehicleadvreceipt/vehicleadvbalreceiptadd/vehicleadvbalreceiptadd.component';
import { VehicleadvbalreceiptlistComponent } from './module/vehicleadvreceipt/vehicleadvbalreceiptlist/vehicleadvbalreceiptlist.component';
import { ChallanregisterrptComponent } from './module/challanregisterrpt/challanregisterrpt.component';
import { SparespurchaserptComponent } from './module/sparespurchaserpt/sparespurchaserpt.component';
import { LhpayablestatusrptComponent } from './module/lhpayablestatusrpt/lhpayablestatusrpt.component';
import { VehiclerepairsrptComponent } from './module/vehiclerepairsrpt/vehiclerepairsrpt.component';
import { BillregisterrptComponent } from './module/billregisterrpt/billregisterrpt.component';
import { MrregisterrptComponent } from './module/mrregisterrpt/mrregisterrpt.component';
import { LhpmvariancerptComponent } from './module/lhpmvariancerpt/lhpmvariancerpt.component';
import { GstregisterrptComponent } from './module/gstregisterrpt/gstregisterrpt.component';
import { BenificiarymasteraddComponent } from './module/benificiarymaster/benificiarymasteradd/benificiarymasteradd.component';
import { BenificiarymasterlistComponent } from './module/benificiarymaster/benificiarymasterlist/benificiarymasterlist.component';
import { CnorcneemasterlistComponent } from './module/cnorcneemaster/cnorcneemasterlist/cnorcneemasterlist.component';
import { CnorcneemasteraddComponent } from './module/cnorcneemaster/cnorcneemasteradd/cnorcneemasteradd.component';
import { DieselstmtrptComponent } from './module/dieselstmtrpt/dieselstmtrpt.component';
import { ExpensebudgetsaddComponent } from './module/expensebudgetsadd/expensebudgetsadd.component';
import { CnorcneegstaddComponent } from './module/cnorcneegst/cnorcneegstadd/cnorcneegstadd.component';
import { CnorcneegstlistComponent } from './module/cnorcneegst/cnorcneegstlist/cnorcneegstlist.component';
import { MonthlystatementrptComponent } from './module/monthlystatementrpt/monthlystatementrpt.component';
import { PartygroupmasterlistComponent } from './module/partygroup/partygroupmasterlist/partygroupmasterlist.component';
import { PartygroupmasteraddComponent } from './module/partygroup/partygroupmasteradd/partygroupmasteradd.component';
import { VehiclefrtoutstandingrptComponent } from './module/vehiclefrtoutstandingrpt/vehiclefrtoutstandingrpt.component';
import { LhextrapmtreconrptComponent } from './module/lhextrapmtreconrpt/lhextrapmtreconrpt.component';
import { SubledgermasteraddComponent } from './module/subledgermaster/subledgermasteradd/subledgermasteradd.component';
import { SubledgermasterlistComponent } from './module/subledgermaster/subledgermasterlist/subledgermasterlist.component';
import { BillsuppliaddComponent } from './module/billsuppli/billsuppliadd/billsuppliadd.component';
import { BillsupplilistComponent } from './module/billsuppli/billsupplilist/billsupplilist.component';
import { BillsubmitmasteraddComponent } from './module/billsubmitmaster/billsubmitmasteradd/billsubmitmasteradd.component';
import { BillsubmitmasterlistComponent } from './module/billsubmitmaster/billsubmitmasterlist/billsubmitmasterlist.component';
import { AdditionalcostrecmasteraddComponent } from './module/additionalcostrec/additionalcostrecmasteradd/additionalcostrecmasteradd.component';
import { AdditionalcostrecmasterlistComponent } from './module/additionalcostrec/additionalcostrecmasterlist/additionalcostrecmasterlist.component';
import { BilloutstandingrptComponent } from './module/billoutstandingrpt/billoutstandingrpt.component';
import { TripoutstandingrptComponent } from './module/tripoutstandingrpt/tripoutstandingrpt.component';
import { LrcostingrptComponent } from './module/lrcostingrpt/lrcostingrpt.component';
import { TripsummaryrptComponent } from './module/tripsummaryrpt/tripsummaryrpt.component';
import { OnaccountmrstatusrptComponent } from './module/onaccountmrstatusrpt/onaccountmrstatusrpt.component';
import { AddcostrecorveryrptComponent } from './module/addcostrecorveryrpt/addcostrecorveryrpt.component';
import { FasttagaddComponent } from './module/fasttag/fasttagadd/fasttagadd.component';
import { FasttaglistComponent } from './module/fasttag/fasttaglist/fasttaglist.component';
import { AddcostrecentrylistComponent } from './module/addcostrecentry/addcostrecentrylist/addcostrecentrylist.component';
import { AddcostrecentryaddComponent } from './module/addcostrecentry/addcostrecentryadd/addcostrecentryadd.component';
import { TripenroutebycompanyaddComponent } from './module/tripenroutebycompany/tripenroutebycompanyadd/tripenroutebycompanyadd.component';
import { TripenroutebycompanylistComponent } from './module/tripenroutebycompany/tripenroutebycompanylist/tripenroutebycompanylist.component';
import { BusinesssummrptComponent } from './module/businesssummrpt/businesssummrpt.component';
import { ChallanenquiryComponent } from './module/challanenqiry/challanenquiry/challanenquiry.component';
import { MrenquiryComponent } from './module/mrenquiry/mrenquiry/mrenquiry.component';
import { BillenquiryComponent } from './module/billenquiry/billenquiry/billenquiry.component';
import { ChallanreleaseaddComponent } from './module/challanrelease/challanreleaseadd/challanreleaseadd.component';
import { ChallanreleaselistComponent } from './module/challanrelease/challanreleaselist/challanreleaselist.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'useradd', component: UseraddComponent },
  { path: 'useredit', component: UseraddComponent },
  { path: 'adddestination', component: AdddestinationComponent },
  { path: 'destinationedit', component: AdddestinationComponent },
  { path: 'destinationlist', component: DestinationlistComponent },
  { path: 'productgroupmasterlist', component: ProductgroupmasterlistComponent },
  { path: 'addproductgroupmaster', component: AddproductgroupmasterComponent },
  { path: 'productgroupmasteredit', component: AddproductgroupmasterComponent },
  { path: 'addproductmaster', component: AddproductmasterComponent },
  { path: 'productmasteredit', component: AddproductmasterComponent },
  { path: 'productmasterlist', component: ProductmasterlistComponent },
  { path: 'brandmasterlist', component: BrandmasterlistComponent },
  { path: 'addbrandmaster', component: AddbrandmasterComponent },
  { path: 'brandmasteredit', component: AddbrandmasterComponent },
  { path: 'tyreposmasterlist', component: TyrepositionmasterlistComponent },
  { path: 'addtyrepositionmaster', component: AddtyrepositionmasterComponent },
  { path: 'tyrepositionmasteredit', component: AddtyrepositionmasterComponent  },
  { path: 'adddocrenewalmaster', component: AdddocrenewalmasterComponent },
  { path: 'docrenewalmasteredit', component: AdddocrenewalmasterComponent },
  { path: 'docrenewalmasterlist', component: DocrenewalmasterlistComponent },
  { path: 'docrenewalentrylist', component: DocrenewalentrylistComponent },
  { path: 'adddocrenewalentry', component: AdddocrenewalentryComponent },
  { path: 'docrenewalentryedit', component: AdddocrenewalentryComponent },
  { path: 'addratetypes', component: AddratetypesComponent },
  { path: 'ratetypesedit', component: AddratetypesComponent },
  { path: 'ratetypeslist', component: RatetypeslistComponent },
  { path: 'addroletype', component: AddroletypeComponent },
  { path: 'roletypeedit', component: AddroletypeComponent },
  { path: 'roletypelist', component: RoletypelistComponent },
  { path: 'addhrmaster', component: AddhrmasterComponent },
  { path: 'hrmasteredit', component: AddhrmasterComponent },
  { path: 'proftaxmstlist', component: PtslabmasterlistComponent },
  { path: 'addptslabmaster', component: AddptslabmasterComponent },
  { path: 'ptslabmasteredit', component: AddptslabmasterComponent },
  { path: 'hrmasterlist', component: HrmasterlistComponent },
  { path: 'addlrbillseries', component: AddlrbillseriesComponent },
  { path: 'lrbillseriesedit', component: AddlrbillseriesComponent },
  { path: 'lrbillserieslist', component: LrbillserieslistComponent },
  { path: 'addratesmaster', component: AddratesmasterComponent },
  { path: 'ratesmasteredit', component: AddratesmasterComponent },
  { path: 'ratesmasterlist', component: RatesmasterlistComponent },
  { path: 'addvehicletypemaster', component: AddvehicletypemasterComponent },
  { path: 'addvehicletypegroupmaster', component: AddvehicletypegroupmasterComponent },
  { path: 'vehicletypemasteredit', component: AddvehicletypemasterComponent },
  { path: 'vehicletypegroupmasteredit', component: AddvehicletypegroupmasterComponent },
  { path: 'vehtypeslist', component: VehicletypemasterlistComponent },
  { path: 'vehicletypegroupmasterlist', component: VehicletypegroupmasterlistComponent },
  { path: 'consignmentlist', component: ConsignmentlistComponent },
  { path: 'consignmentadd', component: ConsignmentaddComponent },
  { path: 'consignmentedit', component: ConsignmentaddComponent },
  { path: 'branchmasterlist', component: BranchmasterlistComponent },
  { path: 'addbranchmaster', component: AddbranchmasterComponent },
  { path: 'fleetcardmasterlist', component: FleetcardmasterlistComponent },
  { path: 'addfleetcardmaster', component: AddfleetcardmasterComponent },
  { path: 'editfleetcardmaster', component: AddfleetcardmasterComponent },
  { path: 'branchmasteredit', component: AddbranchmasterComponent },
  { path: 'vehiclemasterlist', component: VehiclemasterlistComponent },
  { path: 'vehiclemasteradd', component: VehiclemasteraddComponent },
  { path: 'vehiclemasteredit', component: VehiclemasteraddComponent },
  { path: 'drivermasterlist', component: DrivermasterlistComponent },
  { path: 'drivermasteradd', component: DrivermasteraddComponent },
  { path: 'drivermasteredit', component: DrivermasteraddComponent },
  { path: 'trippaymentlist', component: TrippaymentslistComponent },
  { path: 'distancemasterfreightlist', component: DistancemasterfreightlistComponent },
  { path: 'distancemasterfreightadd', component: DistancemasterfreightaddComponent },
  { path: 'distancemasterfreightedit', component: DistancemasterfreightaddComponent },
  { path: 'distancemastertriplist', component: DistancemastertriplistComponent },
  { path: 'distancemastertripadd', component: DistancemastertripaddComponent },
  { path: 'distancemastertripedit', component: DistancemastertripaddComponent },
  { path: 'addtrippayments', component: AddtrippaymentsComponent },
  { path: 'trippaymentsedit', component: AddtrippaymentsComponent },
  { path: 'gstpurchaselist', component: GstpurchaselistComponent },
  { path: 'gstpurchaseadd', component: GstpurchaseaddComponent },
  { path: 'gstpurchaseedit', component: GstpurchaseaddComponent },
  { path: 'cashreceiptentrylist', component: CashreceiptentrylistComponent },
  { path: 'addcashreceiptentry', component: AddcashreceiptentryComponent },
  { path: 'cashreceiptentryedit', component: AddcashreceiptentryComponent },
  { path: 'bankreceiptentrylist', component: BankreceiptentrylistComponent },
  { path: 'addbankreceiptentry', component: AddbankreceiptentryComponent },
  { path: 'bankreceiptentryedit', component: AddbankreceiptentryComponent },
  { path: 'intermediatescreen', component: IntermediatescreenComponent },
  { path: 'tripsheetlist', component: TripsheetlistComponent },
  { path: 'tripsheetadd', component: TripsheetaddComponent },
  { path: 'tripsheetedit', component: TripsheetaddComponent },
  { path: 'bankcashcontralist', component:  BankcashcontralistComponent },
  { path: 'addbankcashcontra', component: AddbankcashcontraComponent },
  { path: 'bankcashcontraedit', component:  AddbankcashcontraComponent },
  { path: 'journalentrylist', component:  JournalentrylistComponent },
  { path: 'addjournalentry', component:  AddjournalentryComponent },
  { path: 'journalentryedit', component:  AddjournalentryComponent },
  { path: 'dieselstatementadd', component:  DieselstatementaddComponent },
  { path: 'dieselstatementedit', component:  DieselstatementaddComponent },
  { path: 'dieselstatementlist', component:  DieselstatementlistComponent },
  { path: 'driversalarystatementadd', component:  DriversalarystatementaddComponent },
  { path: 'driversalarystatementedit', component:  DriversalarystatementaddComponent },
  { path: 'driversalarystatementlist', component:  DriversalarystatementlistComponent },
  { path: 'fingrouplist', component:  FingrouplistComponent },
  { path: 'fingroupadd', component: FingroupaddComponent },
  { path: 'fingroupedit', component: FingroupaddComponent },
  { path: 'finaccountsmasterlist', component:  FinaccountsmasterlistComponent },
  { path: 'finaccountadd', component: FinaccountsmasteraddComponent },
  { path: 'finaccountedit', component: FinaccountsmasteraddComponent },
  { path: 'opbalancelist', component:  FinopenbalancelistComponent },
  { path: 'opbalanceadd', component: FinopenbalanceaddComponent },  
  { path: 'opbrsentrylist', component:  OpbrsentrylistComponent },
  { path: 'addbrsentry', component: AddbrsentryComponent },
  { path: 'editbrsentry', component: AddbrsentryComponent },
  { path: 'opbalanceedit', component: FinopenbalanceaddComponent },
  { path: 'bankrecorpt', component: BankreconcilationComponent },
  { path: 'addeditdistfrt', component: DistancefreighteditComponent},
  { path: 'addeditdisttrip', component: DistancetripeditComponent},
  { path: 'ewaybillext',component:EwaybillextensionlistComponent},
  { path: 'ewaybillextedit',component:EwaybillextensionaddComponent},
  { path: 'roleprivileges',component:RoleprivilegesComponent},
  { path: 'changepassword', component: ChangepasswordComponent},
  { path: 'exparrivals', component: ExptruckarrivalreportComponent}, 
  { path: 'ewaybillextedit',component:EwaybillextensionaddComponent},
  { path: 'cashbookrpt', component: CashbookreportComponent},
  { path: 'docrenewalrpt', component: DocrenewalrptComponent},
  { path: 'tripstatusrpt', component: TripstatusrptComponent},
  { path: 'distancemasterfrtrpt', component: DistancemasterfrtrptComponent},
  { path: 'distancemastertriprpt', component: DistancemastertriprptComponent},
  { path: 'trippaymentsrpt', component: TrippaymentsrptComponent},
  { path: 'driverlicrpt', component: DriverlicrptComponent},
  { path: 'employeemstlist', component:  EmpmasterlistComponent },
  { path: 'employeemstadd', component: EmpmasteraddComponent },  
  { path: 'employeemstedit', component:  EmpmasteraddComponent },
  { path: 'empsalmstlist', component:  EmpsalarylistComponent },
  { path: 'empsalmstadd', component: EmpsalaryaddComponent },  
  { path: 'empsalmstedit', component:  EmpsalaryaddComponent },
  { path: 'loansentrylist', component:  EmploanlistComponent },
  { path: 'loansentryadd', component: EmploanaddComponent },  
  { path: 'loansentryedit', component:  EmploanaddComponent },
  { path: 'loansrepaylist', component:  EmploanrepaylistComponent },
  { path: 'loansrepayadd', component: EmploanrepayaddComponent },  
  { path: 'loansrepayedit', component:  EmploanrepayaddComponent },
  { path: 'happaystatementlist', component:  HappaystatementlistComponent },
  { path: 'gstsalesregisterrptlist', component:  GstsalesregisterrptlistComponent },
  { path: 'happaystatementadd', component: HappaystatementaddComponent },  
  { path: 'happaystatementedit', component:  HappaystatementaddComponent },
  { path: 'changebranch', component:  ChangebranchComponent },
  { path: 'salcalclist', component:  EmpsalcalculationlistComponent },
  { path: 'salcalcadd', component: EmpsalcalculationaddComponent },  
  { path: 'salcalcedd', component:  EmpsalcalculationaddComponent },
  { path: 'customwizard', component: CustwizardaddComponent },  
  { path: 'custwizardedit', component: CustwizardaddComponent }, 
  { path: 'dailyloadrpt', component:  DailyloadingrptComponent },
  { path: 'acledgerrpt', component:  LedgerrptComponent },  
  { path: 'bankbookrpt', component:  BankbookrptComponent },  
  { path: 'consopbalances', component:  ConsolidatedopenbalComponent },  
  { path: 'happaystmtrpt', component:  HappaystatementrptComponent },  
  { path: 'ewaybillexprpt', component:  EwaybillexprptComponent },   
  { path: 'dprindentlist', component:  DrpmasterlistComponent },    
  { path: 'dprindentadd', component:  DrpmasteraddComponent },   
  { path: 'dprindentedit', component:  DrpmasteraddComponent },
  { path: 'mkttrucklist', component:  TruckmasterlistComponent },    
  { path: 'addtruckmaster', component:  AddtruckmasterComponent },   
  { path: 'truckmasteredit', component:  AddtruckmasterComponent },
  { path: 'mkttrucklist', component:  TruckmasterlistComponent },    
  { path: 'addtruckmaster', component:  AddtruckmasterComponent },   
  { path: 'truckmasteredit', component:  AddtruckmasterComponent },
  { path: 'transportmstlist', component:  TransportmasterlistComponent },    
  { path: 'addtransportmaster', component:  AddtransportmasterComponent },   
  { path: 'transportmasteredit', component:  AddtransportmasterComponent },
  { path: 'classmasterlist', component:  ClassificationmasterlistComponent },    
  { path: 'classificationmasteradd', component:  ClassificationmasteraddComponent },   
  { path: 'classificationmasteredit', component:  ClassificationmasteraddComponent },
  { path: 'dprvehplacedlist', component:   DprvehiplacedlistComponent},
  { path: 'dprvehplacededit', component:  DprvehiplacedaddComponent },
  { path: 'dprtempgclist', component:   GeneratetempgclistComponent},
  { path: 'dprtempgcadd', component: GeneratetempgcaddComponent },
  { path: 'dprtempgcedit', component: GeneratetempgceditComponent },
  { path: 'challanlist', component:  ChallanmasterlistComponent },
  { path: 'challanadd', component:  ChallanmasteraddComponent },
  { path: 'challanedit', component:  ChallanmasteraddComponent },
  { path: 'billstatementlist', component:  BillsmasterlistComponent },
  { path: 'billsmasteradd', component:  BillsmasteraddComponent },
  { path: 'billsmasteredit', component:  BillsmasteraddComponent },
  { path: 'delacklist', component:  DeliveryackpodlistComponent },
  { path: 'delackadd', component:  DeliveryackpodaddComponent },
  { path: 'delackedit', component:  DeliveryackpodaddComponent },
  { path: 'docallotlist', component:  Documentallottmentlistcomponent },
  { path: 'docallotadd', component:  AdddocumentallottmentComponent },
  { path: 'docallotedit', component:  AdddocumentallottmentComponent },
  { path: 'billtypeslist', component:  BilltypelistComponent },
  { path: 'billtypeadd', component:  BilltypeaddComponent },
  { path: 'billtypeedit', component:  BilltypeaddComponent },
  { path: 'updatecnforbill', component:  ConsignmentupdateComponent },
  { path: 'sparesmasterlist', component:  SpareslubesmasterlistComponent },
  { path: 'spareslubesmasteradd', component:  SpareslubesmasteraddComponent },
  { path: 'spareslubesmasteredit', component:  SpareslubesmasteraddComponent },
  { path: 'tyremodmasterlist', component:  TyremodellistComponent },
  { path: 'tyremodelmasteradd', component:  TyremodeladdComponent },
  { path: 'tyremodelmasteredit', component:  TyremodeladdComponent },
  { path: 'maintmasterlist', component:  MaintanencemasterlistComponent },
  { path: 'maintanencemasteradd', component:  MaintanencemasteraddComponent },
  { path: 'maintanencemasteredit', component:  MaintanencemasteraddComponent },
  { path: 'lhpmtlist', component:  LorryhirepmtlistComponent },
  { path: 'lhpmtadd', component:  LorryhirepmtaddComponent },
  { path: 'lhpmtedit', component:  LorryhirepmtaddComponent },
  { path: 'lhextrapmtreqlist', component:  LorryhirepmtreqlistComponent },
  { path: 'lhextrapmtreqadd', component:  LorryhirepmtreqaddComponent },
  { path: 'lhextrapmtreqedit', component:  LorryhirepmtreqaddComponent },
  { path: 'lhextrapmtapprlist', component:  LorryhirepmtaprvlistComponent },
  { path: 'lhextrapmtappradd', component:  LorryhirepmtaprvaddComponent },
  { path: 'lhextrapmtappredit', component:  LorryhirepmtaprvaddComponent },
  { path: 'emimasterlist', component:   VehicleinstschedulelistComponent},
  { path: 'emimasteradd', component:  VehicleinstscheduleaddComponent },
  { path: 'emimasteredit', component:  VehicleinstscheduleaddComponent },
  { path: 'tbplbsrpt', component: BalanacerptComponent},
  { path: 'companyinfo', component: CompanyinfoaddComponent},
  { path: 'mrentrylist', component: MrlistComponent},
  { path: 'mrentryadd', component: MraddComponent },
  { path: 'mrentryedit', component: MraddComponent },
  { path: 'tbplbsrpt', component:  BalanacerptComponent},
  { path: 'companyinfo', component:  CompanyinfoaddComponent},
  { path: 'emipmtlist', component:  VehicleinstpmtlistComponent},
  { path: 'vehicleinstpmtadd', component:  VehicleinstpmtaddComponent},
  { path: 'vehicleinstpmtedit', component:  VehicleinstpmtaddComponent},
  { path: 'tyrepurchaselist', component:  TyrepurchasemasterlistComponent },
  { path: 'tyrepurchaseadd', component:  TyrepurchasemasteraddComponent },
  { path: 'tyrepurchaseedit', component:  TyrepurchasemasteraddComponent }, 
  { path: 'tyreactivatelist', component:  TyreativatelistComponent },
  { path: 'tyreactivateadd', component:  TyreativateaddComponent },
  { path: 'tyreactivateedit', component:  TyreativateaddComponent }, 
  { path: 'tyredeactlist', component:   TyredeativatelistComponent},
  { path: 'tyredeactadd', component:  TyredeativateaddComponent },
  { path: 'tyredeactedit', component:  TyredeativateaddComponent }, 
  { path: 'tyrerethreadisslist', component:  TyreregroupissuelistComponent}, 
  { path: 'tyrerethreadissadd', component:  TyreregroupissueaddComponent }, 
  { path: 'tyrerethreadissedit', component:  TyreregroupissueaddComponent }, 
  { path: 'tyrerethreadrecvlist', component:  TyreregrouprecdlistComponent }, 
  { path: 'tyrerethreadrecvadd', component:  TyreregrouprecdaddComponent }, 
  { path: 'tyrerethreadrecvedit', component:  TyreregrouprecdaddComponent }, 
  { path: 'fleetloadentryadd', component:  FleetloadentryaddComponent},
  { path: 'fleetloadentryedit', component:  FleetloadentryaddComponent},
  { path: 'loadmemolist', component:  FleetloadentrylistComponent},
  { path: 'dieselimplist', component: DieselstmtlistComponent}, 
  { path: 'dieselimpadd', component: DieselstmtaddComponent }, 
  { path: 'dieselimpedit', component: DieselstmtaddComponent }, 
  { path: 'tyresalelist', component:TyresaleslistComponent},
  { path: 'tyresaleadd', component:TyresalesaddComponent },
  { path: 'tyresaleedit', component:TyresalesaddComponent },
  { path: 'lhpmslabmasteradd', component: LhpmslabmasteraddComponent }, 
  { path: 'lhpmslabmasteredit', component: LhpmslabmasteraddComponent }, 
  { path: 'lhpmslablist', component: LhpmslabmasterlistComponent }, 
  { path: 'custgstlocations', component: FinaccountmastergstComponent },   
  { path: 'tripexptypemasteradd', component: TripexptypemasteraddComponent }, 
  { path: 'tripexptypemasteredit', component: TripexptypemasteraddComponent }, 
  { path: 'tripexpmasterlist', component: TripexptypemasterlistComponent }, 
  { path: 'bookingreg', component: BookingregisterComponent }, 
  { path: 'cnnotdispatch', component: LrwithoutchallanrptComponent },
  { path: 'unbilledrpt', component: UnbilledrptComponent },
  { path: 'cnenquiry', component: CnenquiryComponent }, 
  { path: 'sparespurchasemasteradd', component: SparespurchasemasteraddComponent }, 
  { path: 'sparespurchasemasteredit', component: SparespurchasemasteraddComponent }, 
  { path: 'sparespurchaselist', component: SparespurchasemasterlistComponent },  
  { path: 'tyrepurchrpt', component: TyrepurchaserptComponent },   
  { path: 'tyrestockrpt', component: TyrestockrptComponent },   
  { path: 'tyrehistory', component: TyrehistoryrptComponent }, 
  { path: 'tyreactivelist', component: TyreactiverptComponent }, 
  { path: 'tyreactrpt', component: TyreactivatedrptComponent }, 
  { path: 'tyredeactrpt', component: TyredeactivatedrptComponent },   
  { path: 'tyreissrgp', component: TyreregroupissrptComponent },   
  { path: 'tyrerecvrgp', component: TyreregrouprcvdrptComponent },  
  { path: 'dprvehplacedadd', component: DprplacevehicleComponent },
  { path: 'vehiclerepmaintadd', component: VehiclerepmaintaddComponent }, 
  { path: 'vehiclerepmaintmasteredit', component: VehiclerepmaintaddComponent }, 
  { path: 'vehiclerepairslist', component: VehiclerepmaintlistComponent },  
  { path: 'vehicleadvbalreceiptadd', component: VehicleadvbalreceiptaddComponent }, 
  { path: 'Vehicleadvbalreceiptedit', component: VehicleadvbalreceiptaddComponent }, 
  { path: 'vehicleadvballist', component: VehicleadvbalreceiptlistComponent },
  { path: 'challanreg', component: ChallanregisterrptComponent },  
  { path: 'lhpayablerpt', component: LhpayablestatusrptComponent },  
  { path: 'sparepurchrpt', component: SparespurchaserptComponent },  
  { path: 'vehilcereprpt', component: VehiclerepairsrptComponent },
  { path: 'billreg', component: BillregisterrptComponent },
  { path: 'onacmrstratus', component: MrregisterrptComponent },
  { path: 'lhpmvarrpt', component: LhpmvariancerptComponent },
  { path: 'gstreg', component: GstregisterrptComponent },
  { path: 'benmasterlist', component: BenificiarymasterlistComponent },
  { path: 'benificiarymasteradd', component: BenificiarymasteraddComponent },
  { path: 'benificiarymasteredit', component: BenificiarymasteraddComponent },
  { path: 'cnorcneemasteradd', component: CnorcneemasteraddComponent },
  { path: 'cnorcneemasteredit', component: CnorcneemasteraddComponent },
  { path: 'budgetexp', component: ExpensebudgetsaddComponent },
  { path: 'cnorcneegstadd', component: CnorcneegstaddComponent},
  { path: 'cnorcneegstedit', component: CnorcneegstaddComponent},
  { path: 'cnorcneegst', component: CnorcneegstaddComponent},
  { path: 'monthlystmt', component: MonthlystatementrptComponent },
  { path: 'partygroupadd', component:  PartygroupmasteraddComponent },
  { path: 'partygroupedit', component:  PartygroupmasteraddComponent },
  { path: 'partygrouplist', component:  PartygroupmasterlistComponent },
  { path: 'dslstmtrpt', component: DieselstmtrptComponent },
  { path: 'searchcnorcnee', component: CnorcneemasterlistComponent },
  { path: 'vehicleadvbalrpt', component: VehiclefrtoutstandingrptComponent },
  { path: 'lhextrapmtreconrpt', component: LhextrapmtreconrptComponent },
  { path: 'partygrpmst', component:  PartygroupmasterlistComponent },
  { path: 'subledgermasteradd', component:  SubledgermasteraddComponent },
  { path: 'subledgermasteredit', component:  SubledgermasteraddComponent },
  { path: 'subledgerlist', component:  SubledgermasterlistComponent },
  { path: 'tripoutstnd', component:  TripoutstandingrptComponent },
  { path: 'billentrysuppadd', component:  BillsuppliaddComponent },
  { path: 'billentrysuppedit', component:  BillsuppliaddComponent },
  { path: 'billentrysupplist', component:  BillsupplilistComponent },  
  { path: 'billsubmitmasteradd', component:  BillsubmitmasteraddComponent },
  { path: 'billsubmitmasteredit', component:  BillsubmitmasteraddComponent },
  { path: 'billsubmitist', component:  BillsubmitmasterlistComponent },  
  { path: 'additionalcostrecmasteradd', component:  AdditionalcostrecmasteraddComponent },
  { path: 'additionalcostrecmasteredit', component:  AdditionalcostrecmasteraddComponent },
  { path: 'addcostrecmst', component:  AdditionalcostrecmasterlistComponent },  
  { path: 'billentrysupplist', component: BillsupplilistComponent },  
  { path: 'billoutstndrpt', component: BilloutstandingrptComponent },  
  { path: 'lrcosting', component: LrcostingrptComponent },
  { path: 'tripvehsum', component: TripsummaryrptComponent },
  { path: 'mrreg', component: OnaccountmrstatusrptComponent },
  { path: 'addcostrecrpt', component: AddcostrecorveryrptComponent },
  { path: 'fastagimport', component: FasttaglistComponent },
  { path: 'fasttagimpadd', component: FasttagaddComponent },
  { path: 'fasttagimpedit', component: FasttagaddComponent },
  { path: 'addcostentrylist', component: AddcostrecentrylistComponent },
  { path: 'addcostentryadd', component: AddcostrecentryaddComponent },
  { path: 'addcostentryedit', component: AddcostrecentryaddComponent },
  { path: 'tripexpbycomp', component: TripenroutebycompanylistComponent},
  { path: 'tripenroutebycompanyadd', component: TripenroutebycompanyaddComponent },
  { path: 'tripenroutebycompanyedit', component: TripenroutebycompanyaddComponent },
  { path: 'chlnenquiry', component: ChallanenquiryComponent },
  { path: 'mrenquiry', component: MrenquiryComponent },
  { path: 'billenquiry', component: BillenquiryComponent},
  { path: 'challanrelease', component: ChallanreleaselistComponent },
  { path: 'challanreleaseadd', component: ChallanreleaseaddComponent },
  { path: 'challanreleaseedit', component: ChallanreleaseaddComponent },
  
  
  
  { path: 'busisummlr', component: BusinesssummrptComponent },
 

   

];


@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
