import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstpurchaseaddComponent } from './gstpurchaseadd.component';

describe('GstpurchaseaddComponent', () => {
  let component: GstpurchaseaddComponent;
  let fixture: ComponentFixture<GstpurchaseaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstpurchaseaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstpurchaseaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
