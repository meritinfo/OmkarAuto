import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstpurchaselistComponent } from './gstpurchaselist.component';

describe('GstpurchaselistComponent', () => {
  let component: GstpurchaselistComponent;
  let fixture: ComponentFixture<GstpurchaselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstpurchaselistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstpurchaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
