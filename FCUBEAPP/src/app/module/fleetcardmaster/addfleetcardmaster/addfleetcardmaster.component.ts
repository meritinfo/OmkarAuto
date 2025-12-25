import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Fleetcardmastermodel } from 'src/app/models/fleetcardmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { FleetCardMasterService } from 'src/app/services/fleetcardmaster.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-addfleetcardmaster',
  templateUrl: './addfleetcardmaster.component.html',
  styleUrls: ['./addfleetcardmaster.component.css']
})
export class AddfleetcardmasterComponent {
  
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  cardDetails = new Requestmodel();
  ledgerAcList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  keywordLocation = 'dataName';


  selectedFleetCardMasterDetails = new Fleetcardmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private fleetcardMasterModel: Fleetcardmastermodel, private fleetcardmasterService: FleetCardMasterService, 
    private commonService: CommonService,private toastrService: ToastrService,private requestmodel:Requestmodel,
    private sharedService: SharedService) {
    this.fleetcardMasterModel = new Fleetcardmastermodel();
  }
  ngOnInit(): void {
  
    this.sharedService.loading = true;
    this.editMode = false;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Fleet Card Master"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    
    this.sharedService.loggedInStatus = true;
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    this.getCardledgerAcList();
    this.getVehicleIdList();

    this.selectedFleetCardMasterDetails = this.fleetcardmasterService.getFleetCardMasterDetails();
    this.formUser = this.formBuilder.group({
      cardType: new FormControl('',[Validators.required]),
      cardCode: new FormControl('',[Validators.required]),
      cardNo: new FormControl('',[Validators.required]),
      cardPin: new FormControl('',[Validators.required]),
      cardLedgerAc: new FormControl('',),
      vehicleNo: new FormControl('',),
      driverName: new FormControl('',),
      driverLicNo: new FormControl('',),
      mobileNo: new FormControl('',[Validators.required]),
      isActive: new FormControl('',),
    });
  
    if (this.selectedFleetCardMasterDetails.cardId != '') {
      setTimeout(() => {
        this.formUser.patchValue(this.selectedFleetCardMasterDetails);
        this.formUser.patchValue({
          vehicleNo: this.vehicleList.find(e => e.dataName == this.selectedFleetCardMasterDetails.vehicleNo),  
        })
      }, 1000);     
      this.editMode = true;
      this.sharedService.loading = false;
    }
    this.sharedService.loading = false;
  }
    
  get f() { return this.formUser.controls; }

  getCardledgerAcList(): void {
    this.commonService.getCardledgerAcList().subscribe((res) => {
      this.ledgerAcList = res;
    });
  }  
    
  getVehicleIdList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
  
  selectEvent(item: any) {
    this.requestmodel.strRequest = item.dataName;
    this.requestmodel.strRequest1 = this.selectedFleetCardMasterDetails.cardId;
    this.fleetcardmasterService.checkVehicleCardLinked(this.requestmodel).subscribe((res: Responsemodel) => {
      if (res.status) {
        //ignore
      }
      else {
        this.formUser.patchValue({        
          vehicleNo: "",
        });  
        this.toastrService.warning(res.message);
      }
    });
  }
  
  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().includes(query.toLowerCase()));
  };

  checkDuplicateCardCode() {
    this.cardDetails.strRequest = this.formUser.value.cardCode;
    this.commonService.checkDuplicateCardCode(this.cardDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (!this.responseDetails.status) {
        this.toastrService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          cardCode: ''
        });
      }
    });
  }

  checkDuplicateCardNo() {
    this.cardDetails.strRequest = this.formUser.value.cardNo;
    this.commonService.checkDuplicateCardNo(this.cardDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (!this.responseDetails.status) {
        this.toastrService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          cardNo: ''
        });
      }
    });
  }

  fleetCardMasterDelete(): void {
    if(this.selectedFleetCardMasterDetails.cardId!= '' ){
    this.requestmodel.strRequest =this.selectedFleetCardMasterDetails.cardId
      if (confirm("Are you sure, you want to delete this?")) {
        this.fleetcardmasterService.fleetCardMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/fleetcardmasterlist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
  exit(): void {
    this.route.navigate(['/fleetcardmasterlist']);
  }

  //Submit user form details //
  submitFleetCardMasterForm(): void {
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

            
    this.formSubmitted = true;
    this.fleetcardMasterModel.cardId = this.selectedFleetCardMasterDetails.cardId;
    var selectedDataValue = this.formUser.getRawValue();
    this.fleetcardMasterModel.cardType= selectedDataValue.cardType;
    this.fleetcardMasterModel.cardCode = selectedDataValue.cardCode;
    this.fleetcardMasterModel.cardNo = selectedDataValue.cardNo;
    this.fleetcardMasterModel.cardPin = selectedDataValue.cardPin.toString().toUpperCase();
    this.fleetcardMasterModel.cardLedgerAc = selectedDataValue.cardLedgerAc;
    this.fleetcardMasterModel.vehicleNo = selectedDataValue.vehicleNo.toString().toUpperCase();
    this.fleetcardMasterModel.driverName = selectedDataValue.driverName.toString().toUpperCase();;
    this.fleetcardMasterModel.driverLicNo = selectedDataValue.driverLicNo.toString().toUpperCase();;
    this.fleetcardMasterModel.mobileNo = selectedDataValue.mobileNo;
    this.fleetcardMasterModel.isActive = selectedDataValue.isActive;
    this.fleetcardMasterModel.loggedInUser = this.loggedInUserID;
    this.fleetcardmasterService.fleetCardMasterDetailsSubmitted(this.fleetcardMasterModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/fleetcardmasterlist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading = false;
  }
}



