import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/common/constants';
import { Cashbookreportrequestmodel } from 'src/app/models/cashbookreportrequestmodel.model';
import { CashbookreportService } from 'src/app/services/cashbookreport.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-cashbookreport',
  templateUrl: './cashbookreport.component.html',
  styleUrls: ['./cashbookreport.component.css']
})
export class CashbookreportComponent {

  requestDetails = new Cashbookreportrequestmodel();
  constructor(private cashbookreportService: CashbookreportService,private pdfService : PdfService, private route: Router) {
  }

  search(): void {
    var branchname = sessionStorage.getItem('branchname')?.toString();
    if (typeof branchname !== 'undefined' && branchname !== null && branchname !== '') {
      this.requestDetails.branch = branchname;
    }
    this.cashbookreportService.getCashBookReport(this.requestDetails)
      .subscribe((resp: any) => {
        let link = document.createElement("a");
        link.download = "CashbookReport" + "_" + new Date().getTime() + '.pdf';
        link.href = "assets/" + resp.message;
        link.click();
        //window.open("assets/" + resp.message);
      });
  }
}
