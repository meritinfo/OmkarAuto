import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distancemasterfreightlist',
  templateUrl: './distancemasterfreightlist.component.html',
  styleUrls: ['./distancemasterfreightlist.component.css']
})
export class DistancemasterfreightlistComponent {
  constructor(private route: Router) {
  }
  //Open new driver master add screen
  distanceMasterFreightAdd(): void {
    this.route.navigate(['/frtdistancemasteradd']);
  }
}
