import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivermasteraddComponent } from './drivermasteradd.component';

describe('DrivermasteraddComponent', () => {
  let component: DrivermasteraddComponent;
  let fixture: ComponentFixture<DrivermasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivermasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivermasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
