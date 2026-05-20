import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocrenewalentrylistComponent } from './docrenewalentrylist.component';

describe('DocrenewalentrylistComponent', () => {
  let component: DocrenewalentrylistComponent;
  let fixture: ComponentFixture<DocrenewalentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocrenewalentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocrenewalentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
