import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnaccountmrstatusrptComponent } from './onaccountmrstatusrpt.component';

describe('OnaccountmrstatusrptComponent', () => {
  let component: OnaccountmrstatusrptComponent;
  let fixture: ComponentFixture<OnaccountmrstatusrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnaccountmrstatusrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnaccountmrstatusrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
