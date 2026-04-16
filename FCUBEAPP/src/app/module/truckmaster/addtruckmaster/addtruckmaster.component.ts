import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DprvehiplacedService } from 'src/app/services/dprvehiplaced.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Truckmastermodel } from 'src/app/models/truckmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { ChallanmasterService } from 'src/app/services/challanmaster.service';
import { TruckMasterService } from 'src/app/services/truckmaster.service';
import { ToastrService } from 'ngx-toastr';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Panvalidapiresultmodel } from 'src/app/models/panvalidapiresultmodel';
import { Constants } from 'src/app/common/constants';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-addtruckmaster',
  templateUrl: './addtruckmaster.component.html',
  styleUrls: ['./addtruckmaster.component.css']
})

export class AddtruckmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = []; 
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
    editMode = false;
  viewStatus = false; 
  dashboard: string ="";
  year: string = '';
  loginDate: string = '';
  branch:string = '';
  truckMasterMandatoryYN: string = "";
  vehicleApiDataYN: string = "";
  

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;
  @ViewChild('attachmentInput1', {
    static: true
  }) attachmentInput1: any;
  panDetails = new Panvalidapiresultmodel();
  selectedTruckMasterDetail = new Truckmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private vehicleTypeGroupMasterModel: Truckmastermodel, private dprvehiplacedService: DprvehiplacedService,
    private vehicleTypeGroupMasterService: TruckMasterService,  private lrentryService: ConsignmentService,
    private sharedService : SharedService,private challanmasterService: ChallanmasterService,
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.vehicleTypeGroupMasterModel = new Truckmastermodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Market Truck Master"));      
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }
    
    
    this.sharedService.loggedInStatus = true;
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    else {
      this.route.navigate(['/']);
    }

    this.getStateList();
    this.getTruckMasterMandatoryYN();
    this.getVehicleApiDataYN();
    this.selectedTruckMasterDetail = this.vehicleTypeGroupMasterService.getTruckMasterDetails();
    this.formUser = this.formBuilder.group({
      truckNo: new FormControl('',[Validators.required]),
      regnDate: new FormControl('',[Validators.required]),
      ownerName: new FormControl('',[Validators.required]),
      ownerType: new FormControl('',),
      ownMarket: new FormControl('M',),
      panNo: new FormControl('',),
      aadharNo: new FormControl('',[Validators.required]),
      aadharLinkedYN: new FormControl('',),
      panValidYN: new FormControl('',),
      itFiledYN: new FormControl('',),
      address1: new FormControl('',),
      address2: new FormControl('',),
      address3: new FormControl('',),
      address4: new FormControl('',),
      stateCode: new FormControl('',),
      pinCode: new FormControl('',),
      phoneNo: new FormControl('',),
      contactName: new FormControl('',),
      mobileNo: new FormControl('',),
      chasisNo: new FormControl('',),
      engineNo: new FormControl('',),
      vehCode: new FormControl('',),
      model: new FormControl('',),
      mfrName: new FormControl('',),
      ladenWt: new FormControl('',),
      unLadenWt: new FormControl('',),
      insuranceDt: new FormControl('',),
      nationalPermitDt: new FormControl('',),
      fitnessDt: new FormControl('',),
      rcUpload: new FormControl('',),
      otherUpload: new FormControl('',),
      isActive: new FormControl('Y',),
      inActiveDate: new FormControl('',),
      remarks: new FormControl('',),
    });

    if (this.selectedTruckMasterDetail.truckID != '') {
       this.attachmentInput = Constants.UploadFolderPath + 'truck/' + this.selectedTruckMasterDetail.rcUpload;
      this.attachmentInput1 = Constants.UploadFolderPath + 'truck/' + this.selectedTruckMasterDetail.otherUpload;
      this.formUser.patchValue(this.selectedTruckMasterDetail);
      this.formUser.controls['truckNo'].disable();
      this.formUser.patchValue({
        isActive: this.selectedTruckMasterDetail.isActive,
        regnDate: this.commonService.formatDate(this.selectedTruckMasterDetail.regnDate),
        insuranceDt: this.commonService.formatDate(this.selectedTruckMasterDetail.insuranceDt),
        nationalPermitDt: this.commonService.formatDate(this.selectedTruckMasterDetail.nationalPermitDt),
        fitnessDt: this.commonService.formatDate(this.selectedTruckMasterDetail.fitnessDt),
        inActiveDate: this.commonService.formatDate(this.selectedTruckMasterDetail.inActiveDate),
        ownerType:this.selectedTruckMasterDetail.ownerType   
      })
        this.editMode = true;
    }
  }
  onOwnerPanChange() {
    var selectedData = this.formUser.getRawValue();
    var pan = selectedData.panNo ;
    var regexp = new RegExp('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$')
    var test = regexp.test(pan);
    var tdsPct = 0;

    if(pan == "PANNOTREQD"){
      tdsPct = 0;
    }
    else if(pan == "NOVALIDPAN"){
      tdsPct = 20;
    }
    else if(pan.length!=10){
      this.toastrService.warning("PAN No should be 10 characters...!");
      return;
    }
    else if(!test){
      this.toastrService.warning("Invalid PAN No...!");
      return;
    }
    else
    {
      this.requestmodel.strRequest = pan;
      this.requestmodel.strRequest1 = selectedData.challanDateTime;
      
      this.challanmasterService.getPanwiseTdsRate(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.formUser.patchValue({
            panValidYN:"Y",
            tdsPct: parseFloat(this.responseDetails.message)
          });  
          this.formUser.patchValue({
            panValidYN: "Y",
          //  tdsPct: parseFloat(this.responseDetails.message),
          //  declarationYN:"",
          });   
        }
        else
        {
          this.requestmodel.strRequest = this.branch;      
          this.challanmasterService.getBranchPanApiUse(this.requestmodel).subscribe((res: Responsemodel) => {
            if(res.status){
               this.formUser.controls["panValidYN"].disable();  
               this.formUser.controls["aadharLinkedYN"].disable();  
              // this.formUser.controls["declarationYN"].disable();  
              // this.formUser.controls["tdsPct"].disable(); 
                           
              this.requestmodel.strRequest = pan;
              this.requestmodel.strRequest1 = this.loggedInUserID;
              
              this.challanmasterService.getPanValidDetails(this.requestmodel).subscribe((res: Panvalidapiresultmodel) => {
                this.panDetails = res;
                var panValidYN = "N";
                var aadharLinkedYN = "N";
                if (this.panDetails.result.number!="") { 
                  if(this.panDetails.result.isValid){
                    panValidYN= "Y";
                  }
                  if(this.panDetails.result.aadhaarSeedingStatusCode=="Y"){
                    aadharLinkedYN="Y";
                  }             
                  tdsPct = 20;

                  this.requestmodel.strRequest = pan.substring(3, 4) ;
                  this.requestmodel.strRequest1 = selectedData.challanDateTime;

                  this.challanmasterService.getLhPanTdsRate(this.requestmodel).subscribe((res: Reportmodel) => {
                    if(panValidYN == "Y"){
                      tdsPct = parseFloat(res.filterStr);
                      if(res.filterStr1=="Y" && aadharLinkedYN!="Y")//Aadhar
                      {
                        tdsPct = 20;
                      }
                    }
                    else{                
                      tdsPct = 20;
                    }
                    if(res.filterStr2=='Y'){  
                     // this.formUser.controls["declarationYN"].enable();   
                    }
                    this.formUser.patchValue({
                      panValidYN: panValidYN,
                      aadharLinkedYN: aadharLinkedYN,
                      // vehicleOwnerName: this.panDetails.result.name,
                      // tdsPct: tdsPct,
                      // declarationYN: "",
                    });   
                  });  
                }
                else{          
                  this.toastrService.warning("Invalid PAN No...!");
                  return;
                }            
              });      
            }
            else
            {                 
              this.formUser.controls["panValidYN"].enable();  
              this.formUser.controls["aadharLinkedYN"].enable();  
             // this.formUser.controls["tdsPct"].enable();
            //  this.formUser.controls["declarationYN"].enable(); 
            }
          });
        }
      });
    }


  }
  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }



  get f() { return this.formUser.controls; }

  exit(): void {
    this.route.navigate(['/mkttrucklist']);
  }

  chkTruckNo(e: any) {
 
    var selectedData = this.formUser.getRawValue();
   
    if (selectedData.truckNo==""){
      this.toastrService.warning("Vehicle No should not be Blank");
      return;
    }
    // if(this.truckMasterMandatoryYN=="Y")
    // {

    //   this.requestmodel.strRequest = selectedData.truckNo.toString().toUpperCase();
    //   this.lrentryService.checkTruckNo(this.requestmodel).subscribe((res: Responsemodel) => {
    //     this.responseDetails = res;
    //     if (this.responseDetails.status) {
    //       this.vehicleTypeGroupMasterService.getTruckMstDetails(this.requestmodel).subscribe((res) => {
    //      var chlDate = new Date(selectedData.challanDateTime);
    //     var panValid = res.panValidYN=="Y"?"Y":"";
    //     var aadharLinked = res.aadharLinkedYN=="Y"?"Y":"";
    //     var permitDate = new Date(this.commonService.formatDate(res.nationalPermitDt));
    //     var clrchlDate=chlDate.setHours(0, 0, 0, 0);
    //     var clrpermitDate=permitDate.setHours(0, 0, 0, 0);
    //     var permitValid = clrchlDate<clrpermitDate ? "Y" : "";
    //     this.formUser.patchValue({
    //         ownerName : res.ownerName.toString(),
    //         panNo: res.panNo.toString(),
    //         address1 : res.address1.toString(),
    //         address2 : res.address2.toString(),
    //         mobileNo: res.mobileNo.toString(),
    //        // permitValid      : permitValid,
    //         panValidYN         : panValid,
    //         aadharLinkedYN     : aadharLinked,
    //         model     : res.model.toString(),
    //         engineNo         : res.engineNo.toString(),
    //         chassisNo        : res.chasisNo.toString(),
    //       });            
    //     });
        
    //     }
    //    else{
    //       this.toastrService.warning(this.responseDetails.message);
    //       this.formUser.patchValue({
    //         truckNo:"",
    //       });   
    //     }
    //   });
    // }
     if(this.vehicleApiDataYN=="Y")
     {
     this.requestmodel.strRequest = selectedData.truckNo;
      this.requestmodel.strRequest1 = this.loggedInUserID;
      this.dprvehiplacedService.getVehicleDetails(this.requestmodel).subscribe((res) => {
        this.formUser.patchValue({
           ownerName  : res.vehOwnerName.toString(),
            panNo: res.ownerPan.toString(),
            address1 : res.vehAdd1.toString(),
            address2 : res.vehAdd2.toString(),
            mobileNo: res.vehOwnerMobile.toString(),
        });         
      });
    
     }
    if(selectedData.ownTruckYN)
    {
       this.requestmodel.strRequest = selectedData.truckNo.toString().toUpperCase();
      this.lrentryService.checkVehicleNo(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
       else{
          this.toastrService.warning(this.responseDetails.message);
          this.formUser.patchValue({
            truckNo:"",
          });   
        }
      });
    }   
  }

  
  getTruckMasterMandatoryYN(): void {
    this.lrentryService.getTruckMasterMandatoryYN().subscribe((res) => {
      this.truckMasterMandatoryYN = res.message;
    });
  }

  getVehicleApiDataYN(): void {
      this.lrentryService.getVehicleApiDataYN().subscribe((res) => {
      this.vehicleApiDataYN = res.message;
    });
  }


  truckMasterDelete(): void {
    if(this.selectedTruckMasterDetail.truckID != '' ){
    this.requestmodel.strRequest =this.selectedTruckMasterDetail.truckID
      if (confirm("Are you sure, you want to delete this?")) {
          this.vehicleTypeGroupMasterService.truckMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/mkttrucklist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }

  submitTruckMasterForm(): void {
    if (this.formUser.invalid) {
      this.toastrService.warning("Please enter mandatory fields");
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          // Convert camelCase key to readable format
          const readableName = name.replace(/([A-Z])/g, ' $1');
          const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);

          this.toastrService.warning(titleCaseName + " field is invalid");
        }
      }
      return;
    }
    var selectedDataValue = this.formUser.getRawValue();

    this.vehicleTypeGroupMasterModel.truckID = this.selectedTruckMasterDetail.truckID;
    this.vehicleTypeGroupMasterModel.truckNo = selectedDataValue.truckNo;
    this.vehicleTypeGroupMasterModel.regnDate = selectedDataValue.regnDate;
    this.vehicleTypeGroupMasterModel.ownerName = selectedDataValue.ownerName.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.ownerType = selectedDataValue.ownerType;
    this.vehicleTypeGroupMasterModel.ownMarket = selectedDataValue.ownMarket;
    this.vehicleTypeGroupMasterModel.panNo = selectedDataValue.panNo?selectedDataValue.panNo.toString().toUpperCase():"";
    this.vehicleTypeGroupMasterModel.aadharNo = selectedDataValue.aadharNo;
    this.vehicleTypeGroupMasterModel.aadharLinkedYN = selectedDataValue.aadharLinkedYN;
    this.vehicleTypeGroupMasterModel.panValidYN = selectedDataValue.panValidYN;
    this.vehicleTypeGroupMasterModel.itFiledYN = selectedDataValue.itFiledYN;
    this.vehicleTypeGroupMasterModel.address1 = selectedDataValue.address1.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.address2 = selectedDataValue.address2.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.address3 = selectedDataValue.address3.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.address4 = selectedDataValue.address4.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.stateCode = selectedDataValue.stateCode;
    this.vehicleTypeGroupMasterModel.pinCode = selectedDataValue.pinCode;
    this.vehicleTypeGroupMasterModel.phoneNo = selectedDataValue.phoneNo;
    this.vehicleTypeGroupMasterModel.contactName = selectedDataValue.contactName?selectedDataValue.contactName.toString().toUpperCase():"";   
     this.vehicleTypeGroupMasterModel.mobileNo = selectedDataValue.mobileNo;
    this.vehicleTypeGroupMasterModel.chasisNo = selectedDataValue.chasisNo?selectedDataValue.chasisNo.toString().toUpperCase():"";
    this.vehicleTypeGroupMasterModel.engineNo = selectedDataValue.engineNo;
    this.vehicleTypeGroupMasterModel.vehCode = selectedDataValue.vehCode;
    this.vehicleTypeGroupMasterModel.model = selectedDataValue.model;
    this.vehicleTypeGroupMasterModel.mfrName = selectedDataValue.mfrName;
    this.vehicleTypeGroupMasterModel.ladenWt = selectedDataValue.ladenWt;
    this.vehicleTypeGroupMasterModel.unLadenWt = selectedDataValue.unLadenWt;
    this.vehicleTypeGroupMasterModel.insuranceDt = selectedDataValue.insuranceDt;
    this.vehicleTypeGroupMasterModel.nationalPermitDt = selectedDataValue.nationalPermitDt;
    this.vehicleTypeGroupMasterModel.fitnessDt = selectedDataValue.fitnessDt;
    this.vehicleTypeGroupMasterModel.rcUpload = selectedDataValue.rcUpload?selectedDataValue.rcUpload:'';
    this.vehicleTypeGroupMasterModel.otherUpload = selectedDataValue.otherUpload?selectedDataValue.otherUpload:'';
    this.vehicleTypeGroupMasterModel.isActive = selectedDataValue.isActive;
    this.vehicleTypeGroupMasterModel.inActiveDate = selectedDataValue.inActiveDate;
    this.vehicleTypeGroupMasterModel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.loggedInUser = this.loggedInUserID;
    
    let formData = new FormData();
    formData.append('attach', this.attachmentInput.nativeElement.files[0]);
    formData.append('attach1', this.attachmentInput1.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.vehicleTypeGroupMasterModel));

    this.vehicleTypeGroupMasterService.truckmasterSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/mkttrucklist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }
}


