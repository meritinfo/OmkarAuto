import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbookreportComponent } from './cashbookreport.component';

describe('CashbookreportComponent', () => {
  let component: CashbookreportComponent;
  let fixture: ComponentFixture<CashbookreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashbookreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashbookreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
