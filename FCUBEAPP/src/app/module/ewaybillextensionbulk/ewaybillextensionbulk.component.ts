import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ewaybillextlistmodel } from 'src/app/models/ewaybillextlistmodel';
import { EwaybillextService } from 'src/app/services/ewaybillext.service';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder,FormArray, FormControl, FormGroup } from '@angular/forms';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ewaybillextensionbulk',
  templateUrl: './ewaybillextensionbulk.component.html',
  styleUrls: ['./ewaybillextensionbulk.component.css']
})
export class EwaybillextensionbulkComponent {
  loggedInUserID: string = '';
  year: string = '';
  formUser!: FormGroup;
  eway = new Ewaybillextlistmodel();
  keywordLocation = 'dataName';
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  responseDetails = new Responsemodel();
  filter: Reportmodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'ewayBillExpDate',
      sortOrder: 'asc',
      search: '',
      fromDate: '',
      toDate: '',
      filterStr:'',
      filterStr1:'',
      filterStr2:'',
      filterStr3:'',
    }
  

  constructor(private sharedService: SharedService,
    private route: Router, private formBuilder: FormBuilder,
    private ewaybillextService: EwaybillextService, private commonService: CommonService,
    private toasterService: ToastrService) {
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Ewaybill Bulk Extention");
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

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
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
    
    this.formUser = this.formBuilder.group({
      arrayList: this.formBuilder.array([this.createArray()]),
    });
    this.getEwayExtList();
  }
  
  get f() { return this.formUser.controls; }

  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }  

  createArray() {
    return this.formBuilder.group({
      selected:[''],
      ewayBillNo:  [''],
      bookingDate:  [''],
      vehicleNo :  [''],
      fromLocation:[''],
      destination:[''],
      currentPlace:  [''],
      fromPin:  [''],
      toPin:  [''],
      remarks:  [''],  
    });
  }

  getEwayExtList()
  {
    
    this.formArray.controls[0].get("ewayBillNo")?.disable();
    this.formArray.controls[0].get("bookingDate")?.disable();
    this.formArray.controls[0].get("vehicleNo")?.disable();
    this.formArray.controls[0].get("fromLocation")?.disable();
    this.formArray.controls[0].get("destination")?.disable();
    this.formArray.controls[0].get("currentPlace")?.disable();
    this.formArray.controls[0].get("fromPin")?.disable();
    this.formArray.controls[0].get("remarks")?.disable();

    this.ewaybillextService.getEwaybillextList(this.filter).subscribe((res) => {
      this.eway = res;
      this.formArray.clear();
      for (var i = 0; i < res.ewaybillextList.length; i++) {
        this.formArray.push(this.createArray());
        this.formArray.controls[i].get("selected")?.setValue("Y");
        this.formArray.controls[i].get("ewayBillNo")?.setValue(res.ewaybillextList[i].ewayBillNo);
        this.formArray.controls[i].get("bookingDate")?.setValue(this.commonService.formatDate(res.ewaybillextList[i].bookingDate));
        this.formArray.controls[i].get("vehicleNo")?.setValue(res.ewaybillextList[i].vehicleNo);
        this.formArray.controls[i].get("fromLocation")?.setValue(res.ewaybillextList[i].fromLocation);
        this.formArray.controls[i].get("destination")?.setValue(res.ewaybillextList[i].destination);
        this.formArray.controls[i].get("currentPlace")?.setValue("");
        this.formArray.controls[i].get("fromPin")?.setValue("");
        this.formArray.controls[i].get("toPin")?.setValue(res.ewaybillextList[i].toPin);
        this.formArray.controls[i].get("remarks")?.setValue("");

        
        this.formArray.controls[i].get("ewayBillNo")?.disable();
        this.formArray.controls[i].get("bookingDate")?.disable();
        this.formArray.controls[i].get("vehicleNo")?.disable();
        this.formArray.controls[i].get("fromLocation")?.disable();
        this.formArray.controls[i].get("destination")?.disable();
      }
    });
  }

  selected(e:any,i:number){
    var selected = e.target.value;
    if(selected){
      this.formArray.controls[i].get("currentPlace")?.enable();
      this.formArray.controls[i].get("fromPin")?.enable();
      this.formArray.controls[i].get("remarks")?.enable();
    }
    else{      
      this.formArray.controls[i].get("currentPlace")?.setValue("");
      this.formArray.controls[i].get("fromPin")?.setValue("");
      this.formArray.controls[i].get("remarks")?.setValue("");

      this.formArray.controls[i].get("currentPlace")?.disable();
      this.formArray.controls[i].get("fromPin")?.disable();
      this.formArray.controls[i].get("remarks")?.disable();
    }

  }
  
   
  submitEwaybillForm(): void {
    var selectedDataVal=this.formUser.getRawValue();
    this.formSubmitted = true;
    
    this.eway.ewaybillextList = [];
    
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {   
      if(selectedDataVal.arrayList[i].selected){
        var kms=""; 
        if(selectedDataVal.arrayList[i].currentPlace==""){
          this.toasterService.warning("Current Place should not be block");
          return;
        }
        if(selectedDataVal.arrayList[i].fromPin==""){
          this.toasterService.warning("From PIN should not be block");
          return;
        }
        if(selectedDataVal.arrayList[i].remarks==""){
          this.toasterService.warning("Remarks should not be block");
          return;
        }
        if(selectedDataVal.arrayList[i].fromPin==selectedDataVal.arrayList[i].toPin){
          kms = "10";
        }
        this.eway.ewaybillextList.push({
          'bookedAt': "",
          'bookingDate': selectedDataVal.arrayList[i].bookingDate,
          'gcNoteNo': "",
          'gcSlNo': "",
          'ewayBillNo': selectedDataVal.arrayList[i].ewayBillNo,
          'ewayBillDate': "",
          'ewayBillExpDate': "",
          'vehicleNo': selectedDataVal.arrayList[i].vehicleNo,
          'fromLocation': selectedDataVal.arrayList[i].currentPlace,
          'fromPin': selectedDataVal.arrayList[i].fromPin,
          'destination': "",
          'toPin': selectedDataVal.arrayList[i].toPin,
          'partyName': "",
          'consignor': "",
          'consignee':"",
          'accountCity': "",
          'cnorState': "",
          'accountAddress1': "",
          'accountAddress2': "",
          'accountAddress3': "",
          'kMS': kms, 
          'state': "",
          'mode': "1", 
          'reason': "Others", 
          'remarks': selectedDataVal.arrayList[i].remarks, 
          'consignmentStatus': "M", 
          'transitType': "", 
          'loggedInUser': "",           
        });
      }
    }

    this.ewaybillextService.ewaybillextBulkSubmitted(this.eway).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message); 
        this.formUser.reset();
        window.location.reload();
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      } 
    });
    
    this.sharedService.loading=false;
  }   
 
}
  