import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillinterestlossrptComponent } from './billinterestlossrpt.component';

describe('BillinterestlossrptComponent', () => {
  let component: BillinterestlossrptComponent;
  let fixture: ComponentFixture<BillinterestlossrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillinterestlossrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillinterestlossrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
