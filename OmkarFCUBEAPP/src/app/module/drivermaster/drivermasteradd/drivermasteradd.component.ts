import { Component } from '@angular/core';

@Component({
  selector: 'app-drivermasteradd',
  templateUrl: './drivermasteradd.component.html',
  styleUrls: ['./drivermasteradd.component.css']
})
export class DrivermasteraddComponent {

  submitDriverMasterForm(){
    console.log("Form Submitted");
  }
}
