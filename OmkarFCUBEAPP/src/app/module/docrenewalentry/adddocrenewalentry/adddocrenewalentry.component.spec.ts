import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddocrenewalentryComponent } from './adddocrenewalentry.component';

describe('AdddocrenewalentryComponent', () => {
  let component: AdddocrenewalentryComponent;
  let fixture: ComponentFixture<AdddocrenewalentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddocrenewalentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddocrenewalentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
