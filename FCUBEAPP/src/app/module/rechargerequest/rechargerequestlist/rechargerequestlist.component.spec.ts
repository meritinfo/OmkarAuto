import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargerequestlistComponent } from './rechargerequestlist.component';

describe('RechargerequestlistComponent', () => {
  let component: RechargerequestlistComponent;
  let fixture: ComponentFixture<RechargerequestlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargerequestlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargerequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
