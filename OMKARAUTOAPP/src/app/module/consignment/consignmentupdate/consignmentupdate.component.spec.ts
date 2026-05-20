import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentupdateComponent } from './consignmentupdate.component';

describe('ConsignmentupdateComponent', () => {
  let component: ConsignmentupdateComponent;
  let fixture: ComponentFixture<ConsignmentupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignmentupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsignmentupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
