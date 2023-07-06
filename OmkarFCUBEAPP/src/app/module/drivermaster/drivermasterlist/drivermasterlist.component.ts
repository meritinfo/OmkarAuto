import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drivermasterlist',
  templateUrl: './drivermasterlist.component.html',
  styleUrls: ['./drivermasterlist.component.css']
})
export class DrivermasterlistComponent {

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }
  //Open new driver master add screen
  drivermasterAdd(): void {
    this.route.navigate(['/drivermasteradd']);
  }
}
