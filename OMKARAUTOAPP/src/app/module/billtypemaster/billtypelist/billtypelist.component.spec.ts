import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilltypelistComponent } from './billtypelist.component';

describe('BilltypelistComponent', () => {
  let component: BilltypelistComponent;
  let fixture: ComponentFixture<BilltypelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilltypelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilltypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
