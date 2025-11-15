import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargerequestapproveaddComponent } from './rechargerequestapproveadd.component';

describe('RechargerequestapproveaddComponent', () => {
  let component: RechargerequestapproveaddComponent;
  let fixture: ComponentFixture<RechargerequestapproveaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargerequestapproveaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargerequestapproveaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
