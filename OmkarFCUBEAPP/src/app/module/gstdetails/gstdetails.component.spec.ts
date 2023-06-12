import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstdetailsComponent } from './gstdetails.component';

describe('GstdetailsComponent', () => {
  let component: GstdetailsComponent;
  let fixture: ComponentFixture<GstdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
