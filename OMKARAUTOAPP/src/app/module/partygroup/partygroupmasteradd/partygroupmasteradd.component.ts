import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Partygroupmastermodel } from 'src/app/models/partygroupmastermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { PartygroupmasterService } from 'src/app/services/partygroupmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-partygroupmasteradd',
  templateUrl: './partygroupmasteradd.component.html',
  styleUrls: ['./partygroupmasteradd.component.css']
})
export class PartygroupmasteraddComponent {
  loggedInUserID: string = '';
  year: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  keywordLocation = 'dataName';
  partygroupmastersmodel  = new Partygroupmastermodel ();
  editMode = false;
  createStatus = false;
  editStatus = false;
  createmode= true;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
 
  responseDetails = new Responsemodel();
  selectedPartygroupmasterDetails = new Partygroupmastermodel();
  partyList: Dropdownmodel[] = [];
  
  constructor(private route: Router, private formBuilder: FormBuilder, 
    private partygroupmastermodel: Partygroupmastermodel, private sharedService: SharedService,
    private partygroupmasterService: PartygroupmasterService,
    private commonService: CommonService, private requestmodel:Requestmodel,
    private toasterService: ToastrService) {  
  }
  

ngOnInit(): void {
  //Privilege check
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
   var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Party Group Master"));
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
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
 
  this.getPartyList(); 

  this.selectedPartygroupmasterDetails = this.partygroupmasterService.getPartygroupmasterDetails();
    this.formUser = this.formBuilder.group({
      partyGroupDesc: new FormControl('', [Validators.required]),
     arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });

    setTimeout(() => {      
      this.sharedService.loading = true;
      if (this.selectedPartygroupmasterDetails.partyGroupId!= '') {
        console.log(this.selectedPartygroupmasterDetails);
        this.formUser.patchValue(this.selectedPartygroupmasterDetails);
        this.editMode = true;
        this.getPartyGroupDetailInnergridlist(); 
      }
      this.sharedService.loading = false;    
    }, 2000);
  }
 
  getPartyGroupDetailInnergridlist(): void {    
    this.requestmodel.strRequest= this.selectedPartygroupmasterDetails.partyGroupId;
    this.partygroupmasterService.getPartyGroupDetailInnergrid(this.requestmodel).subscribe((res) => {
      this. partygroupmastersmodel = res;
      this.formArray.clear();
      for (let i = 0; i < res.partyGroupDetailModellist.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("partyId")?.setValue(this.partyList.find(e => e.dataId == res.partyGroupDetailModellist[i].partyId));
      }
    });    
  }
 

  
  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }

  
  selectEvent(item: any) {
    // do something with selected item    
  }
  onChangeSearch(search: string) {
    // fetch remote data from here
  }
  onFocused(e: any) {
    // do something
  }
   selectNewEvent(item: any,index:number) {
    var ToPlace = item.dataId;
    var selectedDataValue=this.formUser.getRawValue();

    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(ToPlace == selectedDataValue.arrayList[i].partyId.dataId)
      {
        this.toasterService.warning("To party already exits in grid");
        this.formArray.controls[index].get("partyId")?.setValue("");
        return;
      }
    } 
  }

  
  startWithFilter = function (locationList: Dropdownmodel[], query: string): any[] {
    return locationList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  createInitialArray() {
    return this.formBuilder.group({
      partyId: ['', []],
      //partyGroupDesc: ['', []],
    });
  }
  
  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
    this.formArray.removeAt(index); }
  }

  addItem(index: number): void {  
    var selectedDataValue = this.formUser.getRawValue();
    if (selectedDataValue.arrayList[index].partyId?selectedDataValue.arrayList[index].partyId.dataId:"" != '' ) {
     // if (selectedDataValue.arrayList[index].partyGroupDesc != "" ) {
      this.formArray.push(this.createInitialArray());
    } else {
      this.toasterService.warning("Please select Party");
    }
  }

  getPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  partygroupmasterDelete(): void {
    if(this.selectedPartygroupmasterDetails.partyGroupId != '' ){
    this.requestmodel.strRequest =this.selectedPartygroupmasterDetails.partyGroupId;
      if (confirm("Are you sure, you want to delete this?")) {
            this.partygroupmasterService.deletepartygroupmaster(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/partygrpmst']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }   
        });
      }
    }
  }

  exit(): void {
    this.route.navigate(['/partygrpmst']);
  }

  submitpartygroupForm(): void {
    this.userSubmitted = true;
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
    var selectedDataValue = this.formUser.getRawValue();
    this.partygroupmastermodel.partyGroupId = this.selectedPartygroupmasterDetails.partyGroupId;
    this.partygroupmastermodel.partyGroupDesc  = selectedDataValue.partyGroupDesc.toString().toUpperCase();
    this.partygroupmastermodel.loggedInUser  = this.loggedInUserID;
    
    this.partygroupmastermodel.partyGroupDetailModellist = [];

    for (let i = 0; i < selectedDataValue.arrayList.length; i++) {
      var party = this.partyList.find(e => e.dataId == selectedDataValue.arrayList[i].partyId.dataId) 
      if (typeof party !== 'undefined' && party !== null && party.dataId!="" && party.dataId!="0") {
          //ignore
      }
      else{
        this.toasterService.warning("Please Enter Valid Party Name");          
        return;
      }
     
      if(selectedDataValue.arrayList[i].partyId!=''){
        this.partygroupmastermodel.partyGroupDetailModellist.push({
          'partyGroupDtlId': '',
          'partyGroupId': '',
          'partyId': selectedDataValue.arrayList[i].partyId?selectedDataValue.arrayList[i].partyId.dataId:"",
        });
      }
    }

    this.partygroupmasterService.partygroupmasterSubmitted(this.partygroupmastermodel)
      .subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/partygrpmst']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }   
    });
  }  
}





