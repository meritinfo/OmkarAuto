import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoentryaddComponent } from './doentryadd.component';

describe('DoentryaddComponent', () => {
  let component: DoentryaddComponent;
  let fixture: ComponentFixture<DoentryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoentryaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoentryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
