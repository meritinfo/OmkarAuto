import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentlistComponent } from './consignmentlist.component';

describe('ConsignmentlistComponent', () => {
  let component: ConsignmentlistComponent;
  let fixture: ComponentFixture<ConsignmentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignmentlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsignmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
