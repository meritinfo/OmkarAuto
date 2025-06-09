import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Vehicletypemastermodel } from 'src/app/models/vehicletypemastermodel';

import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehicletypemasterlistmodel } from 'src/app/models/vehicletypemasterlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { VehicleTypeMasterService } from 'src/app/services/vehicletypemaster.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-addvehicletypemaster',
  templateUrl: './addvehicletypemaster.component.html',
  styleUrls: ['./addvehicletypemaster.component.css']
})
export class AddvehicletypemasterComponent {
  loggedInUserID: string = '';
  branch: string = '';
  formUser!: FormGroup;
  branchname: string = '';
  year: string = '';
  loginDate: string = '';
  vehicleTypeList: Dropdownmodel[] = [];
  formSubmitted = false;
  responseDetails = new Responsemodel();
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";


  selectedVehicleTypeMasterDetails = new Vehicletypemastermodel();


  constructor(private route: Router, private formBuilder: FormBuilder, private vehicletypemastermodel: Vehicletypemastermodel, private vehicleTypesService: VehicleTypeMasterService, private commonService: CommonService, private toasterService: ToastrService,private requestmodel:Requestmodel) {
    this.vehicletypemastermodel = new Vehicletypemastermodel();


}

ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Vehicle Types Master");
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
  var userData2 = sessionStorage.getItem('yearID')?.toString();
  if (typeof userData2 !== 'undefined' && userData2!== null && userData2 !== '') {
    this.year = userData2;
  }
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
  var userData5 = sessionStorage.getItem('userBranch')?.toString();
  if (typeof userData5 !== 'undefined' && userData5 !== null && userData5 !== '') {
    this.branchname = userData5;
  }
  else {
    this.route.navigate(['/']);
  }
  //  this.getVehicleTypeList();
  this.getVehicleTypeGroupList();
  
  this.selectedVehicleTypeMasterDetails = this.vehicleTypesService.getvehicletypemasterDetails();
  this.formUser = this.formBuilder.group({
     // vehTypeId: new FormControl('',[Validators.required]),
    vehicleTypeDesc: new FormControl('',[Validators.required]),
    vehicleTypeGroupId: new FormControl('',[Validators.required]),
    tonCap: new FormControl('',[Validators.required]),
    runPerDayKM: new FormControl('',[Validators.required]),
    arrayList: this.formBuilder.array([this.createRatesArray()]),
  

  });

  if (this.selectedVehicleTypeMasterDetails.vehicleTypeID != '') {
    setTimeout(() => {
    this.formUser.patchValue(this.selectedVehicleTypeMasterDetails);
    this.getVehicleTypeInnerGridList();
    this.editMode = true;
     }, 2000);  
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

 get formRatesArray() {
    return this.formUser.get("arrayList") as FormArray;    
    }
  

 
exit(): void {
  this.route.navigate(['/vehtypeslist']);
}

selectToLocationEvent(item: any,index:number) {
   var ToPlace = item.value;
  //  event.target
  // var ToPlace =  this.formRatesArray.value[index].vehTypeAlias;
    var selectedDataValue=this.formUser.getRawValue();
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(ToPlace == selectedDataValue.arrayList[i].vehTypeAlias)
      {
        this.toasterService.warning("Data already exits in grid");
        this.formRatesArray.controls[index].get("vehTypeAlias")?.setValue("");
        return;
      }
    }
    this.chkDuplicateAlias(index);

  }  

getVehicleTypeGroupList(): void {
  this.commonService.getVehicleTypeGroupList().subscribe((res) => {
    this.vehicleTypeList = res;
  });
}



   getVehicleTypeInnerGridList(): void {
        this.requestmodel.strRequest = this.selectedVehicleTypeMasterDetails.vehicleTypeID; 
        this.vehicleTypesService.getVehicleTypeInnerGridList(this.requestmodel).subscribe((res) => {
          this.formRatesArray.clear();
          this.vehicletypemastermodel = res;
          for (var i = 0; i < res.vehicletypeDetailList.length; i++) {
            this.formRatesArray.push(this.createRatesArray());
            this.formRatesArray.controls[i].get("vehTypeId")?.setValue(res.vehicletypeDetailList[i].vehTypeId );
            this.formRatesArray.controls[i].get("vehTypeAlias")?.setValue(res.vehicletypeDetailList[i].vehTypeAlias); 
           
         
          }     
        });
      }

   createRatesArray() {
        return this.formBuilder.group({
          vehTypeId : [''],
          vehTypeAlias: [''],
         
        //  brandId: [''],
     
        });
      } 
    
chkVehTypeDuplicate(){
  var selectedData = this.formUser.getRawValue();
  
  
    this.requestmodel.strRequest = selectedData.vehicleTypeDesc;
  //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.vehicleTypesService.checkDuplicateVehTypeDesc(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          vehicleTypeDesc: ''
  
        });
        
      }
    });
    
}
chkDuplicateAlias(index:number){
  var selectedData = this.formUser.getRawValue();
 // this.requestmodel.strRequest = selectedData.arrayList[index].vehTypeAlias
   this.requestmodel.strRequest = selectedData.vehicleTypeDesc;
    this.requestmodel.strRequest1 = selectedData.arrayList[index].vehTypeAlias;
    this.vehicleTypesService.checkDuplicateAlias(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
 
        this.formRatesArray.controls[index].get("vehTypeAlias")?.setValue("");
        return;
        
      }
    });
    
}
vehicleTypeMasterDelete(): void {
  if(this.selectedVehicleTypeMasterDetails.vehicleTypeID != '' ){
   this.requestmodel.strRequest =this.selectedVehicleTypeMasterDetails.vehicleTypeID
    if (confirm("Are you sure, you want to delete this?")) {
          this.vehicleTypesService.vehicleTypeMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/vehtypeslist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
      });
    }
  }
}

 addItem(i: number): void {    
        var selectedDate = this.formUser.getRawValue();
        if (this.formRatesArray.value[i].vehTypeAlias != ""  ) {
          this.formRatesArray.push(this.createRatesArray());
        } 
   
        else {
          this.toasterService.warning("Please Enter  Details");
        }
        
      }


       removeItem(index: number){ 
        if (confirm("Are you sure, you want to delete this row?")) {
          this.formRatesArray.removeAt(index);  
         // this.onPctChange();
        }
      } 
    


//Submit user form details //
submitVehicleTypeMasterForm(): void {
  if (this.formUser.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields ");   
    const controls = this.formUser.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");   
      }
    }
    return;
  }
  this.formSubmitted = true;
  var selectedDataValue = this.formUser.getRawValue();
  this.vehicletypemastermodel.vehicleTypeID = this.selectedVehicleTypeMasterDetails.vehicleTypeID;
  this.vehicletypemastermodel.vehicleTypeDesc= this.formUser.value.vehicleTypeDesc.toString().toUpperCase();
  this.vehicletypemastermodel.vehicleTypeGroupId = this.formUser.value.vehicleTypeGroupId;
  this.vehicletypemastermodel.tonCap = this.formUser.value.tonCap;
  this.vehicletypemastermodel.runPerDayKM = this.formUser.value.runPerDayKM;
  this.vehicletypemastermodel.loggedInUser = this.loggedInUserID;
  
   this.vehicletypemastermodel.vehicletypeDetailList = [];
        // if(selectedDataValue.netAmount=="" || parseFloat(selectedDataValue.netAmount)==0 ){
        //   this.toastrService.warning("Total Net Amount should not be zero");
        //   return;
        // }
          
        for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
           if (selectedDataValue.arrayList[i].vehTypeAlias == ""  ) {
             this.toasterService.warning("Please Enter  Detail");
             return;
           } 
           else{
            this.vehicletypemastermodel.vehicletypeDetailList.push({
              'vehTypeId': '',//this.selectedVehicleTypeMasterDetails.vehicleTypeID,
           
              'vehTypeAlias': selectedDataValue.arrayList[i].vehTypeAlias.toString().toUpperCase(),
          
               
            }) 
          }
          }   
         


  this.vehicleTypesService.vehicletypemasterDetailsSubmitted(this.vehicletypemastermodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/vehtypeslist']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }      
  });
}
}




