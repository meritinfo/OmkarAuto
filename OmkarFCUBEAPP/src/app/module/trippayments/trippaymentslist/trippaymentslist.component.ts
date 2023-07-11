import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-trippaymentslist',
  templateUrl: './trippaymentslist.component.html',
  styleUrls: ['./trippaymentslist.component.css']
})
export class TrippaymentslistComponent {




  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }
  //Open new driver master add screen
  trippaymentsAdd(): void {
    this.route.navigate(['/addtrippayments']);
  }
}