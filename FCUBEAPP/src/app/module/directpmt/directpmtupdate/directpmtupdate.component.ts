import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Directpmtlistmodel } from 'src/app/models/directpmtlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { DirectpmtService } from 'src/app/services/directpmt.service';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';


@Component({
  selector: 'app-directpmtupdate',
  templateUrl: './directpmtupdate.component.html',
  styleUrls: ['./directpmtupdate.component.css']
})
export class DirectpmtupdateComponent {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  duedate: string = '';
  minDate : string = '';
  maxDate : string = '';
  directBankList: Dropdownmodel[] = [];
  pmtList: Dropdownmodel[] = [];
  formUser!: FormGroup;
  alldirectpmtlist= new Directpmtlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'reqDate',
    sortOrder: 'asc',
    search: '',
    fromDate:"",
    toDate:"",
    filterStr:"",
    filterStr1:"",
    filterStr2:"",
    filterStr3:"",
  }

  keywordLocation = 'dataName';
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  responseDetails = new Responsemodel();

  constructor(private directpmtlist: Directpmtlistmodel, private sharedService: SharedService,
    private requestmodel: Requestmodel, private route: Router, private formBuilder: FormBuilder,
    private commonService: CommonService, private directpmtService: DirectpmtService,
    private toasterService: ToastrService) {
    this.alldirectpmtlist = new Directpmtlistmodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Update Direct Bank");
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
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;
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
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    this.formUser = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      directBankId: new FormControl('', [Validators.required]),
      pmtNo: new FormControl('', [Validators.required]),
      selectedAll: new FormControl('Y'),
    });
    this.getDirectBankList();
    this.getPmtList();
  }

  getDirectBankList(): void {
    this.directpmtService.getDirectBankList().subscribe((res: Dropdownmodel[]) => {
      this.directBankList = res;
      this.formUser.patchValue({
        directBankId:res[0].dataId
      })
    });
  }

  getPmtList(): void {
    this.directpmtService.getPmtList().subscribe((res: Dropdownmodel[]) => {
      this.pmtList = res;
    });
  }

  search(){
    if (this.formUser.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields");   
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }
    var selectedData = this.formUser.getRawValue();
    this.filter.fromDate = selectedData.fromDate;
    this.filter.toDate = selectedData.toDate;
    this.filter.filterStr = this.branch;
    this.filter.filterStr1 = selectedData.directBankId;
    this.filter.search = selectedData.pmtNo;

    this.directpmtService.getDirectPmtDownloadedList(this.filter).subscribe((res) => {
      this.alldirectpmtlist = res; 
      this.formUser.patchValue({
        selectedAll:"Y"
      });
      for (var i = 0; i < this.alldirectpmtlist.pmtList.length; i++) {
        this.alldirectpmtlist.pmtList[i].selected = true;
        this.alldirectpmtlist.pmtList[i].loggedInUser = this.loggedInUserID;
      }
    });
  }
  
  get f() { return this.formUser.controls; }

  selectAll(e: any) {
    if(e.target.checked){
      for (var i = 0; i < this.alldirectpmtlist.pmtList.length; i++) {
        this.alldirectpmtlist.pmtList[i].selected = true;
        this.alldirectpmtlist.pmtList[i].loggedInUser = this.loggedInUserID;
      }
    }
    else{
      for (var i = 0; i < this.alldirectpmtlist.pmtList.length; i++) {
        this.alldirectpmtlist.pmtList[i].selected = false;
        this.alldirectpmtlist.pmtList[i].loggedInUser = this.loggedInUserID;
      }
    }
  }

  
  selectedData(i: number, event: any) {
    this.alldirectpmtlist.pmtList[i].selected = event.target.checked; 
    this.alldirectpmtlist.pmtList[i].loggedInUser = this.loggedInUserID; 
  }  

  exit(): void {
    this.route.navigate(['/updatedirectbank']);
  }
 
  updateDirectPmt(): void {
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
    this.directpmtService.updateDirectPmt(this.alldirectpmtlist).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(res.status){    
        this.toasterService.success(res.message);   
        this.formUser.reset();
        window.location.reload();
        this.route.navigate(['/updatedirectbank']);
      }
      else{        
        this.toasterService.warning(res.message);   
      }
    });
    
    this.sharedService.loading=false;
  }
  

}
