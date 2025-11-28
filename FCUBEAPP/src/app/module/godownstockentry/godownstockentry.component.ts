import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Godownstockmodel } from 'src/app/models/godownstockmodel';
import { SparesLubesMasterService } from 'src/app/services/spareslubesmaster.service';
import { GodownstockentryService } from 'src/app/services/godownstockentry.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-godownstockentry',
  templateUrl: './godownstockentry.component.html',
  styleUrls: ['./godownstockentry.component.css']
})
export class GodownstockentryComponent {
  loggedInUserID: string = '';
  formGodownStockEntryMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  responseDetails = new Responsemodel();
  brandList: Dropdownmodel[] = [];
  godownList: Dropdownmodel[] = [];
  sparesList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  selectedGodownstockmodel = new Godownstockmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private godownstockmodel: Godownstockmodel, 
    private sparesLubesMasterService: SparesLubesMasterService, 
    private godownstockentryService: GodownstockentryService, 
    private commonService: CommonService,
    private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.godownstockmodel = new Godownstockmodel();
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Spares/Lubricants Master");
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
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    this.sharedService.loading = true;   
    this.getBrandList();
    this.getFltGodownList();
    this.getSparesList();

    this.formGodownStockEntryMaster = this.formBuilder.group({   
    godownId: new FormControl('',[Validators.required]),
    arrayList: this.formBuilder.array([this.createInitialArray()])
    });
    this.sharedService.loading = false;

  }

  get f() { return this.formGodownStockEntryMaster.controls; }

  get formArray() {
    return this.formGodownStockEntryMaster.get("arrayList") as FormArray;
  }

  getFltGodownList(): void {
    this.godownstockentryService.getFltGodownList().subscribe((res) => {
      this.godownList = res;
    });
  }
  
  getBrandList(): void {
    this.commonService.getSparesBrandList().subscribe((res) => {
      this.brandList = res;
    });
  }

  getSparesList(): void {
    this.commonService.getSparesList().subscribe((res) => {
      this.sparesList = res;
    });
  }

  
  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  checkduplicate(index: number){
    debugger
    var selectedData= this.formGodownStockEntryMaster.getRawValue();
    var arr=selectedData.arrayList;
    for (var i = 0; i < arr.length; i++) { 
        if(i!=index && arr[index].brandId==arr[i].brandId &&  arr[index].spareLubId==arr[i].spareLubId ){
        this.toasterService.warning("Details already exists");
        this.formArray.controls[index].get("brandId")?.setValue('');
        return;
     
      }
    }
  }
  
  // selectNewEvent(item: any,index:number) {
  //   var spareLubId = item.dataId;
  //   var selectedDataValue=this.formGodownStockEntryMaster.getRawValue();
  //   for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
  //     if(spareLubId == selectedDataValue.arrayList[i].spareLubId.dataId)
  //     {
  //       this.toasterService.warning("Spare/Lube already selected in grid");
  //       this.formArray.controls[index].get("spareLubId")?.setValue("");
  //       return;
  //     }
  //   } 
  // }

    createInitialArray() {
    return this.formBuilder.group({      
      spareLubId: ['', []],
      brandId: ['0', []],
      openingQty: ['0', []],
      openingValue: ['', []],
    });
  }
  
  addItem(index: number): void {
    debugger
    var selectedData= this.formGodownStockEntryMaster.getRawValue();
    var arr=selectedData.arrayList;
    for (var i = 0; i < arr.length; i++) { 
       if(i!=index && arr[index].brandId==arr[i].brandId &&  arr[index].spareLubId==arr[i].spareLubId){
        this.toasterService.warning("Details already exists");
        return;
      } 
    }
    if (arr[index].brandId != "0" && arr[index].openingQty != "0" && arr[index].spareLubId!="") {
      this.formArray.push(this.createInitialArray());
    } else {
      this.toasterService.warning("Please select one Item  detail spare,brand, qty");
    }
  }

  removeItem(index: number) {
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formArray.removeAt(index);
    }
  }



  getSparesLubesInnerGridList(): void {
     var selectedData = this.formGodownStockEntryMaster.getRawValue();
     this.requestmodel.strRequest =selectedData.godownId.toString();
    this.godownstockentryService.getSparesLubesStockInnergrid(this.requestmodel).subscribe((res) => {
      if(res.godownStockModellst.length>0){
        this.formArray.clear();
      }
      if(res.godownStockModellst && res.godownStockModellst.length>0)
      {
      this.godownstockmodel = res;
      for (var i = 0; i < res.godownStockModellst.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("spareLubId")?.setValue(this.sparesList.find(e=>e.dataId==res.godownStockModellst[i].spareLubId))
        this.formArray.controls[i].get("brandId")?.setValue(res.godownStockModellst[i].brandId);
        this.formArray.controls[i].get("openingQty")?.setValue(res.godownStockModellst[i].openingQty);
        this.formArray.controls[i].get("openingValue")?.setValue(res.godownStockModellst[i].openingValue);
        this.formArray.controls[i].get("spareLubId")?.disable();   
        this.formArray.controls[i].get("brandId")?.disable();   
        this.formArray.controls[i].get("openingQty")?.disable();          
        this.formArray.controls[i].get("openingValue")?.disable();          
      } 
      }
      else{
       this.formArray.clear();
        this.formArray.push(this.createInitialArray());
      }
    });
  }

  submitSparesLubesMasterForm(): void { 
    if (this.formGodownStockEntryMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formGodownStockEntryMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    this.sharedService.loading = true;
    var selectedDataVal = this.formGodownStockEntryMaster.getRawValue();
    this.godownstockmodel.godownId=selectedDataVal.godownId.toString();
    this.formSubmitted = true;
    this.godownstockmodel.godownStockModellst = [];
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {  
      if (selectedDataVal.arrayList[i].spareLubId =='' ) {
      this.toasterService.warning("Please select Spare/Lube");
        return;
      } 
      if (selectedDataVal.arrayList[i].brandId =='0' ) {
        this.toasterService.warning("Please select Brand");
        return;
      } 
      if (selectedDataVal.arrayList[i].openingQty =='' ) {
        this.toasterService.warning("Please Enter Qty");
        return;
      } 
      this.godownstockmodel.godownStockModellst.push({     
        'spareLubId'       : selectedDataVal.arrayList[i].spareLubId.dataId,
        'brandId'          : selectedDataVal.arrayList[i].brandId,
        'openingQty'       : selectedDataVal.arrayList[i].openingQty,
        'openingValue'     : selectedDataVal.arrayList[i].openingValue,
        'godownId'         : selectedDataVal.godownId.toString(),
        godownStockModellst: [],
      })
    }  

    this.godownstockentryService.godownStockSave(this.godownstockmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formGodownStockEntryMaster.reset();
        window.location.reload();
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
    this.sharedService.loading = false;
  }
}
