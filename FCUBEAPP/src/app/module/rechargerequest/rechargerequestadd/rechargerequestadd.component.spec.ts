import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargerequestaddComponent } from './rechargerequestadd.component';

describe('RechargerequestaddComponent', () => {
  let component: RechargerequestaddComponent;
  let fixture: ComponentFixture<RechargerequestaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargerequestaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargerequestaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
