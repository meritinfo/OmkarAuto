import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankreceiptentrylistComponent } from './bankreceiptentrylist.component';

describe('BankreceiptentrylistComponent', () => {
  let component: BankreceiptentrylistComponent;
  let fixture: ComponentFixture<BankreceiptentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankreceiptentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankreceiptentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
