import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocrenewalrptComponent } from './docrenewalrpt.component';

describe('DocrenewalrptComponent', () => {
  let component: DocrenewalrptComponent;
  let fixture: ComponentFixture<DocrenewalrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocrenewalrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocrenewalrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
