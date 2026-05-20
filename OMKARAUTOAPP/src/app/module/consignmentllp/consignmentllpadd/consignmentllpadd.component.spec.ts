import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentllpaddComponent } from './consignmentllpadd.component';

describe('ConsignmentllpaddComponent', () => {
  let component: ConsignmentllpaddComponent;
  let fixture: ComponentFixture<ConsignmentllpaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignmentllpaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsignmentllpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
