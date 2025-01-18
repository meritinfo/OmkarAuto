import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoentrylistComponent } from './doentrylist.component';

describe('DoentrylistComponent', () => {
  let component: DoentrylistComponent;
  let fixture: ComponentFixture<DoentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
