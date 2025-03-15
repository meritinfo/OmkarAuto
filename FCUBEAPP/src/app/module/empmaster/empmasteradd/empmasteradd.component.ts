import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, convertToParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { Employeemodel } from 'src/app/models/employeemodel';
import { Empmasterlistmodel } from 'src/app/models/empmasterlistmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { EmpmasterService } from 'src/app/services/empmaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';

@Component({
  selector: 'app-empmasteradd',
  templateUrl: './empmasteradd.component.html',
  styleUrls: ['./empmasteradd.component.css']
})
export class EmpmasteraddComponent {
  loggedInUserID: string = '';
  formEmployee!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  designList: Dropdownmodel[] = [];
  deptList: Dropdownmodel[] = [];
  bankList: Dropdownmodel[] = [];
  preList: Dropdownmodel[] = [];
  languageList: Dropdownmodel[] = [];
  empList: Dropdownmodel[] = [];
  selectedEmployeemodelDetails = new Employeemodel();

  empAttach1: string = "";  
  empAttach2: string = "";

  @ViewChild('empAttach1Input ', {
    static: true
  }) empAttach1Input: any;

  @ViewChild('empAttach2Input', {
    static: true
  }) empAttach2Input: any;

  constructor(private route: Router, private formBuilder: FormBuilder,
    private employeemodel: Employeemodel, private empmasterService: EmpmasterService,
    private commonService: CommonService,
    private toasterService: ToastrService, private requestmodel: Requestmodel) {
    this.employeemodel = new Employeemodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Employee Master"));
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

    this.selectedEmployeemodelDetails = this.empmasterService.getEmployeeDetails();
    this.formEmployee = this.formBuilder.group({
      empPrefix : new FormControl('', [Validators.required]),         
      empNo : new FormControl('', [Validators.required]),             
      empCode : new FormControl('', [Validators.required]),          
      branchCode : new FormControl('', [Validators.required]),        
      empName : new FormControl('', [Validators.required]),           
      fsRelation : new FormControl('',),        
      fsName : new FormControl('', [Validators.required]),            
      gender : new FormControl('', [Validators.required]),            
      dateOfBirth  : new FormControl('', [Validators.required]),      
      age  : new FormControl('', [Validators.required]),              
      pfAcNo : new FormControl('', ),            
      esiAcNo  : new FormControl('', ),          
      panAcNo  : new FormControl('', ),   
      aadhaarNo  : new FormControl('', ),   
      remarks  : new FormControl('', ),          
      presentAdd : new FormControl('', [Validators.required]), 
      phone  : new FormControl('', ),            
      mobile : new FormControl('', [Validators.required]),            
      mobile1 : new FormControl('', ),           
      religion  : new FormControl('', ),        
      motherTongue  : new FormControl('', ),     
      schoolMedium  : new FormControl('', ),     
      collegeMedium  : new FormControl('', ),    
      twoWheelLic   : new FormControl('', ),     
      twoWheelLicenceNo : new FormControl('', ), 
      youOwn2Wheeler  : new FormControl('', ),   
      fourWheelLic    : new FormControl('', ),   
      fourWheelLicenceNo : new FormControl('',),
      youOwn4Wheeler : new FormControl('', ),    
      dateOfAppoint  : new FormControl('', [Validators.required]),    
      designAtJoining: new FormControl('', ),    
      deptCode  : new FormControl('', ),         
      bankCode  : new FormControl('', [Validators.required]),         
      bankAcNo  : new FormControl('', [Validators.required]),         
      bankIFSC   : new FormControl('', [Validators.required]),      
      managersUnder : new FormControl('', ),     
      supervisorsUnder : new FormControl('',),  
      othersUnder : new FormControl('', ),       
      lastGrossSalary    : new FormControl('', ),
      lastBasic : new FormControl('', ),         
      lastHRA  : new FormControl('', ),          
      lastOthers : new FormControl('', ),        
      lastPerks  : new FormControl('', ),        
      removeDate : new FormControl('', ),        
      fullFinal  : new FormControl('', ),   
     
    });

    this.formEmployee.controls['empCode'].disable();
    this.formEmployee.controls['age'].disable();
    this.formEmployee.controls['lastGrossSalary'].disable();

    this.getBranchList();    
    this.getDesignList();
    this.getDeptList();
    this.getBankList();
    this.getLanguageList();
    this.getEmpList();
    this.getPrefixList();

    if (this.selectedEmployeemodelDetails.empId != '') {
      this.formEmployee.patchValue(this.selectedEmployeemodelDetails);
      this.empAttach1 = Constants.UploadFolderPath + 'empmaster/empattach1/' + this.selectedEmployeemodelDetails.empAttach1;
      this.empAttach2 = Constants.UploadFolderPath + 'empmaster/empattach2/' + this.selectedEmployeemodelDetails.empAttach2;
      this.formEmployee.patchValue({
        dateOfBirth: this.commonService.formatDate(this.selectedEmployeemodelDetails.dateOfBirth),
        dateOfAppoint: this.commonService.formatDate(this.selectedEmployeemodelDetails.dateOfAppoint), 
        removeDate: this.commonService.formatDate(this.selectedEmployeemodelDetails.removeDate),     
        managersUnder: this.empList.find(e => e.dataId == this.selectedEmployeemodelDetails.managersUnder),        
        supervisorsUnder: this.empList.find(e => e.dataId == this.selectedEmployeemodelDetails.supervisorsUnder),        
        othersUnder: this.empList.find(e => e.dataId == this.selectedEmployeemodelDetails.othersUnder),
      })

      this.formEmployee.controls['empPrefix'].disable();      
      this.formEmployee.controls['empNo'].disable();

      this.editMode = true;
    }
  }

  get f() { return this.formEmployee.controls; }

  onDOBChange(e: any) {
    this.formEmployee.controls['age'].disable();
    var dob = e.target.value;
    if (dob) {
      let todayDate = new Date();
      let sentOnDate = new Date(dob);
      sentOnDate.setDate(sentOnDate.getDate());
      let differenceInTime = todayDate.getTime() - sentOnDate.getTime();
      var calage = Math.floor((differenceInTime / (1000 * 3600 * 24)) / 365);
      this.formEmployee.patchValue({
        age: calage
      })
    }
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getDesignList(): void {
    this.empmasterService.getDesignList().subscribe((res) => {
      this.designList = res;
    });
  }
  
  getDeptList(): void {
    this.empmasterService.getDeptList().subscribe((res) => {
      this.deptList = res;
    });
  }
  
  getBankList(): void {
    this.empmasterService.getBankList().subscribe((res) => {
      this.bankList = res;
    });
  }
  getPrefixList(): void {
    this.empmasterService.getPreFixList().subscribe((res) => {
      this.preList = res;
    });
  }

  getLanguageList(): void {
    this.empmasterService.getMotherTongueList().subscribe((res) => {
      this.languageList = res;
    });
  }

  getEmpList(): void {
    this.empmasterService.getEmpList().subscribe((res) => {
      this.empList = res;
    });
  }

  selectEvent(item: any) {
    // do something with selected item
    // this.GetOpeningBal();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (vehicleList: Dropdownmodel[], query: string): any[] {
    return vehicleList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  empprefixchange(event: any) {
    var str = event.target.value;
    this.requestmodel.strRequest = str;
    this.empmasterService.getMaxEmpNo(this.requestmodel).subscribe((res) => {
      this.responseDetails = res;
      if (this.responseDetails.status){
        var code = str + this.responseDetails.message.padStart(4, '0');
        this.formEmployee.patchValue({
          empNo: this.responseDetails.message,
          empCode: code.toUpperCase()
        })
      }
    }); 
  }

  empnochange(event: any) {
    var str = event.target.value;
    var selectedDataVal = this.formEmployee.getRawValue();
    var prefix = selectedDataVal.empPrefix.toString();
    var code = prefix + str.padStart(4, '0');

    this.formEmployee.patchValue({
      empCode: code.toUpperCase()
    })

  }

  calcGross(s: string, event: any) {
    var amt = event.target.value;
    var selectedDataVal = this.formEmployee.getRawValue();
    var gross = 0;    
    gross = gross + amt!=""?parseFloat(amt): 0;
    var basic = selectedDataVal.lastBasic!=""? parseFloat(selectedDataVal.lastBasic): 0;
    var hra = selectedDataVal.lastHRA!=""? parseFloat(selectedDataVal.lastHRA): 0;
    var other = selectedDataVal.lastOthers!=""? parseFloat(selectedDataVal.lastOthers): 0;
    var perk = selectedDataVal.lastPerks!=""? parseFloat(selectedDataVal.lastPerks): 0;
    if (s == "B"){
      gross = gross + hra;
      gross = gross + other;
      gross = gross + perk;
    }
    else if (s == "H"){
      gross = gross + basic;
      gross = gross + other;
      gross = gross + perk;
    }
    else if (s == "O"){
      gross = gross + basic;
      gross = gross + hra;
      gross = gross + perk;
    }
    else if (s == "P"){
      gross = gross + basic;
      gross = gross + hra;
      gross = gross + other;
    }

    if (gross > 0){
      this.formEmployee.patchValue({
        lastGrossSalary: gross
      })
    }
    else{
      this.formEmployee.patchValue({
        lastGrossSalary: ''
      })
    }
    

  }

  deleteEmployeeMasterForm(): void {
    if (this.selectedEmployeemodelDetails.empId != '') {
      this.requestmodel.strRequest = this.selectedEmployeemodelDetails.empId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.empmasterService.employeeMasterDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formEmployee.reset();
            this.route.navigate(['/employeemstlist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
  
  exit(): void {
    this.route.navigate(['/employeemstlist']);
  }

  submitEmployeeMasterForm() {
    if (this.formEmployee.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formEmployee.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }
    this.formSubmitted = true;
    var selectedDataVal = this.formEmployee.getRawValue();
    this.employeemodel.empId              = this.selectedEmployeemodelDetails.empId.toString() ;             
    this.employeemodel.empPrefix          = selectedDataVal.empPrefix.toString().toUpperCase()  ;    
    this.employeemodel.empNo              = selectedDataVal.empNo.toString()   ;           
    this.employeemodel.empCode            = selectedDataVal.empCode.toString().toUpperCase()   ;          
    this.employeemodel.empStatus          = "A"  ;           
    this.employeemodel.branchCode         = selectedDataVal.branchCode.toString()   ;           
    this.employeemodel.empName            = selectedDataVal.empName.toString().toUpperCase()   ;           
    this.employeemodel.fsRelation         = "F" ;            
    this.employeemodel.fsName             = selectedDataVal.fsName.toString().toUpperCase()   ;         
    this.employeemodel.gender             = selectedDataVal.gender.toString().toUpperCase()   ;             
    this.employeemodel.dateOfBirth        = selectedDataVal.dateOfBirth.toString()   ;           
    this.employeemodel.age                = selectedDataVal.age.toString()  ;          
    this.employeemodel.pfAcNo             = selectedDataVal.pfAcNo.toString().toUpperCase()  ;                 
    this.employeemodel.esiAcNo            = selectedDataVal.esiAcNo.toString().toUpperCase()   ;                 
    this.employeemodel.panAcNo            = selectedDataVal.panAcNo.toString().toUpperCase()  ;  
    this.employeemodel.aadhaarNo          = selectedDataVal.aadhaarNo.toString().toUpperCase()  ;  
    this.employeemodel.remarks            = selectedDataVal.remarks.toString().toUpperCase()   ;     
    this.employeemodel.presentAdd         = selectedDataVal.presentAdd.toString().toUpperCase()   ;    
    this.employeemodel.phone              = selectedDataVal.phone.toString()  ;      
    this.employeemodel.mobile             = selectedDataVal.mobile.toString()   ;      
    this.employeemodel.mobile1            = selectedDataVal.mobile1.toString()  ;      
    this.employeemodel.religion           = selectedDataVal.religion.toString().toUpperCase()   ;    
    this.employeemodel.motherTongue       = selectedDataVal.motherTongue.toString()   ;      
    this.employeemodel.schoolMedium       = selectedDataVal.schoolMedium.toString().toUpperCase()   ;      
    this.employeemodel.collegeMedium      = selectedDataVal.collegeMedium.toString().toUpperCase()   ;      
    this.employeemodel.twoWheelLic        = selectedDataVal.twoWheelLic.toString().toUpperCase()  ;      
    this.employeemodel.twoWheelLicenceNo  = selectedDataVal.twoWheelLicenceNo.toString().toUpperCase()   ;      
    this.employeemodel.youOwn2Wheeler     = selectedDataVal.youOwn2Wheeler.toString().toUpperCase()   ;      
    this.employeemodel.fourWheelLic       = selectedDataVal.fourWheelLic.toString().toUpperCase()   ;      
    this.employeemodel.fourWheelLicenceNo = selectedDataVal.fourWheelLicenceNo.toString().toUpperCase()   ;      
    this.employeemodel.youOwn4Wheeler     = selectedDataVal.youOwn4Wheeler.toString().toUpperCase()   ;      
    this.employeemodel.dateOfAppoint      = selectedDataVal.dateOfAppoint.toString()   ;      
    this.employeemodel.designAtJoining    = selectedDataVal.designAtJoining.toString()   ;  
    this.employeemodel.deptCode           = selectedDataVal.deptCode.toString()   ;      
    this.employeemodel.bankCode           = selectedDataVal.bankCode.toString()   ;       
    this.employeemodel.bankAcNo           = selectedDataVal.bankAcNo.toString()   ;      
    this.employeemodel.bankIFSC           = selectedDataVal.bankIFSC.toUpperCase()  ;  
    this.employeemodel.managersUnder      = selectedDataVal.managersUnder?selectedDataVal.managersUnder.dataId:'';      
    this.employeemodel.supervisorsUnder   = selectedDataVal.supervisorsUnder?selectedDataVal.supervisorsUnder.dataId:'';      
    this.employeemodel.othersUnder        = selectedDataVal.othersUnder?selectedDataVal.othersUnder.dataId:'';      
    this.employeemodel.lastGrossSalary    = selectedDataVal.lastGrossSalary.toString()  ;  
    this.employeemodel.lastBasic          = selectedDataVal.lastBasic.toString()  ;  
    this.employeemodel.lastHRA            = selectedDataVal.lastHRA.toString()  ;  
    this.employeemodel.lastOthers         = selectedDataVal.lastOthers.toString()  ;    
    this.employeemodel.lastPerks          = selectedDataVal.lastPerks.toString()  ;  
    this.employeemodel.removeDate         = selectedDataVal.removeDate  ;      
    this.employeemodel.fullFinal          = selectedDataVal.fullFinal ;  
    this.employeemodel.loggedInUser       = this.loggedInUserID;  
    
    
    let formData = new FormData();
    formData.append('empAttach1', this.empAttach1Input.nativeElement.files[0]);
    formData.append('empAttach2', this.empAttach2Input.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.employeemodel));     

    this.empmasterService.employeeSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formEmployee.reset();
        this.route.navigate(['/employeemstlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }


}
  