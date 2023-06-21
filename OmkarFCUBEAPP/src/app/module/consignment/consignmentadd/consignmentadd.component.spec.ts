import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentaddComponent } from './consignmentadd.component';

describe('ConsignmentaddComponent', () => {
  let component: ConsignmentaddComponent;
  let fixture: ComponentFixture<ConsignmentaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignmentaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsignmentaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
