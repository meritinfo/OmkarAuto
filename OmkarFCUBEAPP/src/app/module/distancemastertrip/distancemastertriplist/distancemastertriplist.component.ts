import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distancemastertriplist',
  templateUrl: './distancemastertriplist.component.html',
  styleUrls: ['./distancemastertriplist.component.css']
})
export class DistancemastertriplistComponent {
  constructor(private route: Router) {
  }
  //Open new driver master add screen
  distanceMasterTripAdd(): void {
    this.route.navigate(['/distancemastertripadd']);
  }
}
