import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tripsheetlist',
  templateUrl: './tripsheetlist.component.html',
  styleUrls: ['./tripsheetlist.component.css']
})
export class TripsheetlistComponent {
  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }
  //Open new gst purchase add screen
  tripsheetAdd(): void {
    this.route.navigate(['/tripsheetadd']);
  }
}
