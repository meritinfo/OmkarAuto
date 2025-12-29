import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerprofitlossrptComponent } from './customerprofitlossrpt.component';

describe('CustomerprofitlossrptComponent', () => {
  let component: CustomerprofitlossrptComponent;
  let fixture: ComponentFixture<CustomerprofitlossrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerprofitlossrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerprofitlossrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
