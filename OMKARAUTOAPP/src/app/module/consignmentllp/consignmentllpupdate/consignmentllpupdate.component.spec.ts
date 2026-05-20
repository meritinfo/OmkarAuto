import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentllpupdateComponent } from './consignmentllpupdate.component';

describe('ConsignmentllpupdateComponent', () => {
  let component: ConsignmentllpupdateComponent;
  let fixture: ComponentFixture<ConsignmentllpupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignmentllpupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsignmentllpupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
