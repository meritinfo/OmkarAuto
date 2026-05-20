import { Component, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehiclemfrmastermodel  } from 'src/app/models/vehiclemfrmastermodel';
import { VehiclemfrmasterService } from 'src/app/services/vehiclemfrmaster.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-vehiclemfrmasteradd',
  templateUrl: './vehiclemfrmasteradd.component.html',
  styleUrls: ['./vehiclemfrmasteradd.component.css']
})

export class VehiclemfrmasteraddComponent {
  loggedInUserID: string = '';
  userlogindate:string="";
  formVehMfrMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  
  responseDetails = new Responsemodel();

  selectedVehicleMfrMasterModel= new Vehiclemfrmastermodel();
    constructor(private route: Router, private formBuilder: FormBuilder, 
      private vehiclemfrmastermodel: Vehiclemfrmastermodel, private sharedService: SharedService,
      private vehiclemfrmasterService: VehiclemfrmasterService,
      private requestmodel:Requestmodel,
      private toasterService: ToastrService) {
      this.vehiclemfrmastermodel = new Vehiclemfrmastermodel();
    }
  ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Vehicle Mfr Master");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

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
    
    this.formVehMfrMaster = this.formBuilder.group({    
      vehMfrId: new FormControl('',),
      vehMrfName: new FormControl('',[Validators.required]),
 
    });    

    this.sharedService.loading = true;

    this.selectedVehicleMfrMasterModel = this.vehiclemfrmasterService.getVehicleMfrMasterDetails(); 
   
    if (this.selectedVehicleMfrMasterModel.vehMfrId != ''){
      this.requestmodel.strRequest=this.selectedVehicleMfrMasterModel.vehMfrId;
    }
 

    setTimeout(() => {
      if (this.selectedVehicleMfrMasterModel.vehMfrId != '') {
          this.formVehMfrMaster.patchValue(this.selectedVehicleMfrMasterModel);   
          this.editMode=true;           
        }
    }, 2000);
    
    this.sharedService.loading = false;
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formVehMfrMaster.controls; }

  exit(): void {
    this.route.navigate(['/vehiclemfrmasterlist']);
  }


    vehicleMfrMasterChkActName(){
    var selectedData = this.formVehMfrMaster.getRawValue();  
      this.requestmodel.strRequest = selectedData.vehMrfName;
    //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
       this.vehiclemfrmasterService.vehicleMfrMasterChkActName(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toasterService.warning(this.responseDetails.message);
          this.formVehMfrMaster.patchValue({
            vehMrfName: ''  
          });
        }
      });
  }

  
 DeleteVehicleMfrMasterForm(): void {
      if(this.selectedVehicleMfrMasterModel.vehMfrId != '' ){
        this.sharedService.loading = true;
       this.requestmodel.strRequest =this.selectedVehicleMfrMasterModel.vehMfrId
        if (confirm("Are you sure, you want to delete this?")) {
              this.vehiclemfrmasterService.vehicleMfrMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
              this.responseDetails = res;
              if (this.responseDetails.status){              
                console.log(this.responseDetails.message);
                this.formVehMfrMaster.reset();
                this.route.navigate(['/vehiclemfrmasterlist']);
              } 
              else{
                console.log(this.responseDetails.message);  
                this.toasterService.warning(this.responseDetails.message);  
                return; 
              }   
          });
        }
        this.sharedService.loading = false;
    }
 }

 submitVehicleMfrMasterForm(): void {
   if (this.formVehMfrMaster.invalid) {
  this.toasterService.warning("Please enter mandatory fields");

  const controls = this.formVehMfrMaster.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      // Convert camelCase key to readable format
      const readableName = name.replace(/([A-Z])/g, ' $1');
      const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);

      this.toasterService.warning(titleCaseName + " field is invalid");
    }
  }

  return;
}

    var selectedDataValue = this.formVehMfrMaster.getRawValue();
    this.sharedService.loading = true;
    this.formSubmitted = true;
    this.vehiclemfrmastermodel.vehMfrId     = this.selectedVehicleMfrMasterModel.vehMfrId;
    this.vehiclemfrmastermodel.vehMrfName   = selectedDataValue.vehMrfName.toString().toUpperCase();

    this.vehiclemfrmasterService.submitVehicleMfrMasterForm(this.vehiclemfrmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formVehMfrMaster.reset();
        this.route.navigate(['/vehiclemfrmasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading = false;
 }

}


