import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Spareslubesmastermodel } from 'src/app/models/sparelubesmastermodel';
import { SparesLubesMasterService } from 'src/app/services/spareslubesmaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-spareslubesmasteradd',
  templateUrl: './spareslubesmasteradd.component.html',
  styleUrls: ['./spareslubesmasteradd.component.css']
})
export class SpareslubesmasteraddComponent {
  loggedInUserID: string = '';
  formSparesMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  classificationList: Dropdownmodel[] = [];
  brandList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];

  List: Dropdownmodel[] = [];
  selectedSpareslubesMasterDetails = new Spareslubesmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private sparesLubesMasterModel: Spareslubesmastermodel, 
    private sparesLubesMasterService: SparesLubesMasterService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.sparesLubesMasterModel = new Spareslubesmastermodel();

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
    this.selectedSpareslubesMasterDetails = this.sparesLubesMasterService.getSparesLubesMasterDetails();
    this.formSparesMaster = this.formBuilder.group({   
      spareLubName: new FormControl('',[Validators.required]),
      spareLubType: new FormControl('',[Validators.required]),
      sch_Oth: new FormControl('',[Validators.required]),
      lifeType: new FormControl('',[Validators.required]),
      lifeExpectancy: new FormControl('',[Validators.required]),
      isActive: new FormControl('Y',[Validators.required]),
      inventroyYN: new FormControl('',[Validators.required]),
      arrayList: this.formBuilder.array([this.createInitialArray()])
    });

    if (this.selectedSpareslubesMasterDetails.spareLubId != '') {
      this.formSparesMaster.patchValue(this.selectedSpareslubesMasterDetails); 
      this.getSparesLubesInnerGridList();  
      this.editMode = true;
    }
    
    this.sharedService.loading = false;

  }

  get f() { return this.formSparesMaster.controls; }

  get formArray() {
    return this.formSparesMaster.get("arrayList") as FormArray;
  }


  chkSpareDuplicate(){
    var selectedData = this.formSparesMaster.getRawValue();
    this.requestmodel.strRequest = selectedData.spareLubName;
    this.sparesLubesMasterService.checkDuplicateSpare(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formSparesMaster.patchValue({
          spareLubName: ''  
        });        
      }
    });    
  }

  getBrandList(): void {
    this.sparesLubesMasterService.getBrandList().subscribe((res) => {
      this.brandList = res;
    });
  }

  addItem(index: number): void {
    var selectedData= this.formSparesMaster.getRawValue();
    var arr=selectedData.arrayList;
    for (var i = 0; i < arr.length; i++) {  
      if(i!=index && arr[index].brandId==arr[i].brandId){
        this.toasterService.warning("brand already selected");
        return;

      }
    }

    if (this.formArray.value[index].brandId != "0" && this.formArray.value[index].openingQty != "0") {
      this.formArray.push(this.createInitialArray());
    } else {
      this.toasterService.warning("Please select one Item  detail brand, qty");
    }
  }

  removeItem(index: number) {
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formArray.removeAt(index);
    }
  }

  createInitialArray() {
    return this.formBuilder.group({      
      spareLubId: ['', []],
      brandId: ['0', []],
      openingQty: ['0', []],
      openingValue: ['', []],
    });
  }

  getSparesLubesInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedSpareslubesMasterDetails.spareLubId;
    this.sparesLubesMasterService.getSparesLubesMasterInnerGridList(this.requestmodel).subscribe((res) => {
      if(res.sparesLubesDetailList.length>0){
        this.formArray.clear();
      }
      this.sparesLubesMasterModel = res;
      for (var i = 0; i < res.sparesLubesDetailList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("brandId")?.setValue(res.sparesLubesDetailList[i].brandId);
        this.formArray.controls[i].get("openingQty")?.setValue(res.sparesLubesDetailList[i].openingQty);
        this.formArray.controls[i].get("openingValue")?.setValue(res.sparesLubesDetailList[i].openingValue);       
      }     
    });
  }

  exit(): void {
    this.route.navigate(['/sparesmasterlist']);
  }

  deleteSparesLubesMasterForm(): void {
    if(this.selectedSpareslubesMasterDetails.spareLubId != '' ){
    this.requestmodel.strRequest =this.selectedSpareslubesMasterDetails.spareLubId
      if (confirm("Are you sure, you want to delete this?")) {
            this.sparesLubesMasterService.sparesLubesMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formSparesMaster.reset();
              this.route.navigate(['/sparesmasterlist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }

  //Submit user form details //
  submitSparesLubesMasterForm(): void {  
    if (this.formSparesMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formSparesMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
      
    this.sharedService.loading = true;

    var selectedDataVal = this.formSparesMaster.getRawValue();
    this.formSubmitted = true;
    this.sparesLubesMasterModel.spareLubId = this.selectedSpareslubesMasterDetails.spareLubId ;
    this.sparesLubesMasterModel.spareLubName  = selectedDataVal.spareLubName.toString().toUpperCase();
    this.sparesLubesMasterModel.spareLubType = selectedDataVal.spareLubType;
    this.sparesLubesMasterModel.sch_Oth = selectedDataVal.sch_Oth;
    this.sparesLubesMasterModel.lifeType = selectedDataVal.lifeType;
    this.sparesLubesMasterModel.lifeExpectancy = selectedDataVal.lifeExpectancy;
    this.sparesLubesMasterModel.isActive = selectedDataVal.isActive;
    this.sparesLubesMasterModel.inventroyYN = selectedDataVal.inventroyYN;
    this.sparesLubesMasterModel.sparesLubesDetailList = [];

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {  
      if (selectedDataVal.arrayList[i].brandId =='0' ) {
        this.toasterService.warning("Please select Brand");
        return;
      } 
      if (selectedDataVal.arrayList[i].openingQty =='' ) {
        this.toasterService.warning("Please Enter Qty");
        return;
      } 
      // if (selectedDataVal.arrayList[i].openingValue =='' ) {
      //   this.toasterService.warning("Please Enter openingValue");
      //   return;
      // } 
      
      
      this.sparesLubesMasterModel.sparesLubesDetailList.push({     
        'id': '',
        'spareLubId': '',
        'brandId': selectedDataVal.arrayList[i].brandId,
        'openingQty': selectedDataVal.arrayList[i].openingQty,
        'openingValue': selectedDataVal.arrayList[i].openingValue
      })
    }  

    this.sparesLubesMasterService.sparesLubesMasterSubmitted(this.sparesLubesMasterModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formSparesMaster.reset();
        this.route.navigate(['/sparesmasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
    this.sharedService.loading = false;
  }
}
