import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentllplistComponent } from './consignmentllplist.component';

describe('ConsignmentllplistComponent', () => {
  let component: ConsignmentllplistComponent;
  let fixture: ComponentFixture<ConsignmentllplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignmentllplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsignmentllplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
