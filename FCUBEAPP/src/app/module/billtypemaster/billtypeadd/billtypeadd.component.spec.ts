import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilltypeaddComponent } from './billtypeadd.component';

describe('BilltypeaddComponent', () => {
  let component: BilltypeaddComponent;
  let fixture: ComponentFixture<BilltypeaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilltypeaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilltypeaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
