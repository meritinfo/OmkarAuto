import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivermasterlistComponent } from './drivermasterlist.component';

describe('DrivermasterlistComponent', () => {
  let component: DrivermasterlistComponent;
  let fixture: ComponentFixture<DrivermasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivermasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivermasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
