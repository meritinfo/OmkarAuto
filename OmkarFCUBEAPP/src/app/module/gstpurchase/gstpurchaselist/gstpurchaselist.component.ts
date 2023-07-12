import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gstpurchaselist',
  templateUrl: './gstpurchaselist.component.html',
  styleUrls: ['./gstpurchaselist.component.css']
})
export class GstpurchaselistComponent {

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }
  //Open new gst purchase add screen
  gstpurchaseAdd(): void {
    this.route.navigate(['/gstpurchaseadd']);
  }

}
