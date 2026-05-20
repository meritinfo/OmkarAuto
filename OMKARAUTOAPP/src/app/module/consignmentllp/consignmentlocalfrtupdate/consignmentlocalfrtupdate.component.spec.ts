import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentlocalfrtupdateComponent } from './consignmentlocalfrtupdate.component';

describe('ConsignmentlocalfrtupdateComponent', () => {
  let component: ConsignmentlocalfrtupdateComponent;
  let fixture: ComponentFixture<ConsignmentlocalfrtupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignmentlocalfrtupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsignmentlocalfrtupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
