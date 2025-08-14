import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehiclefincompmastermodel  } from 'src/app/models/vehiclefincompmastermodel';
import { VehiclefincompmasterService } from 'src/app/services/vehiclefincompmaster.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-vehiclefincompmasteradd',
  templateUrl: './vehiclefincompmasteradd.component.html',
  styleUrls: ['./vehiclefincompmasteradd.component.css']
})
export class VehiclefincompmasteraddComponent {
  loggedInUserID: string = '';
  userlogindate:string="";
  formVehFinCompMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  
  responseDetails = new Responsemodel();

  selectedVehicleFinCompMasterModel= new Vehiclefincompmastermodel();
    constructor(private route: Router, private formBuilder: FormBuilder, 
      private vehiclefincompmastermodel: Vehiclefincompmastermodel, private sharedService: SharedService,
      private vehiclefincompmasterService: VehiclefincompmasterService,
      private requestmodel:Requestmodel,
      private toasterService: ToastrService) {
      this.vehiclefincompmastermodel = new Vehiclefincompmastermodel();
    }
    ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Vehicle Fin Company Master");
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
    
    this.formVehFinCompMaster = this.formBuilder.group({    
      finCompId: new FormControl('',),
      finCompName: new FormControl('',[Validators.required]),
      isActive: new FormControl('Y',[Validators.required]),
    });    

    this.sharedService.loading = true;

    this.selectedVehicleFinCompMasterModel = this.vehiclefincompmasterService.getvehicleFinCompMasteDetails(); 
   
    if (this.selectedVehicleFinCompMasterModel.finCompId != ''){
      this.requestmodel.strRequest=this.selectedVehicleFinCompMasterModel.finCompId;
    }
 

    setTimeout(() => {
      if (this.selectedVehicleFinCompMasterModel.finCompId != '') {
          this.formVehFinCompMaster.patchValue(this.selectedVehicleFinCompMasterModel);   
          this.editMode=true;           
      }
    }, 2000);
    
    this.sharedService.loading = false;
  }
     // convenience getter for easy access to contact form fields
     get f() { return this.formVehFinCompMaster.controls; }

    exit(): void {
    this.route.navigate(['/vehiclefincomplist']);
    }


  vehicleFinCompMasterChkActName(){
    var selectedData = this.formVehFinCompMaster.getRawValue();  
      this.requestmodel.strRequest = selectedData.finCompName;
    //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
       this.vehiclefincompmasterService.vehicleFinCompMasterChkActName(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toasterService.warning(this.responseDetails.message);
          this.formVehFinCompMaster.patchValue({
            finCompName: ''  
          });
          
        }
    });
  }


   DeleteVehicleFinCompMasterForm(): void {
       
      if(this.selectedVehicleFinCompMasterModel.finCompId != '' ){
        this.sharedService.loading = true;
       this.requestmodel.strRequest =this.selectedVehicleFinCompMasterModel.finCompId
        if (confirm("Are you sure, you want to delete this?")) {
              this.vehiclefincompmasterService.vehicleFinCompMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
              this.responseDetails = res;
              if (this.responseDetails.status){              
                console.log(this.responseDetails.message);
                this.formVehFinCompMaster.reset();
                this.route.navigate(['/vehiclefincomplist']);
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

  submitVehicleFinCompMasterForm(): void {
    if (this.formVehFinCompMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formVehFinCompMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }          
      return;
    }
    var selectedDataValue = this.formVehFinCompMaster.getRawValue();
    this.sharedService.loading = true;
    this.formSubmitted = true;
    this.vehiclefincompmastermodel.finCompId          = this.selectedVehicleFinCompMasterModel.finCompId;
    this.vehiclefincompmastermodel.finCompName        = selectedDataValue.finCompName.toString().toUpperCase();
    this.vehiclefincompmastermodel.isActive           = selectedDataValue.isActive.toString().toUpperCase();
    this.vehiclefincompmastermodel.loggedInUser       = this.loggedInUserID;
    this.vehiclefincompmasterService.submitVehicleFinCompMasterForm(this.vehiclefincompmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formVehFinCompMaster.reset();
        this.route.navigate(['/vehiclefincomplist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading = false;
  }
}

