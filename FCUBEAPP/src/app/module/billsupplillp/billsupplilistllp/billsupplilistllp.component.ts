import { Component } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { BillsmasterlistmodelLLP } from 'src/app/models/billsmasterlistmodelllp';
import { BillsmastermodelllP } from 'src/app/models/billsmastermodelllp';

import { BillsMasterServiceLLP } from 'src/app/services/billsmasterllp.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-billsupplilistllp',
  templateUrl: './billsupplilistllp.component.html',
  styleUrls: ['./billsupplilistllp.component.css']
})
export class BillsupplilistllpComponent {

  
}
