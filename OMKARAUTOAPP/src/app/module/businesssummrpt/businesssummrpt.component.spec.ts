import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesssummrptComponent } from './businesssummrpt.component';

describe('BusinesssummrptComponent', () => {
  let component: BusinesssummrptComponent;
  let fixture: ComponentFixture<BusinesssummrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesssummrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesssummrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
