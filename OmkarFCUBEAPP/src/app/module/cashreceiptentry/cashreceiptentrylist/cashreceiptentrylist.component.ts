import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashreceiptentrylist',
  templateUrl: './cashreceiptentrylist.component.html',
  styleUrls: ['./cashreceiptentrylist.component.css']
})
export class CashreceiptentrylistComponent {
  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }
  //Open new driver master add screen
  cashreceiptentryAdd(): void {
    this.route.navigate(['/addcashreceiptentry']);
  }
}
