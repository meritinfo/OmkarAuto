import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalcostrecmasteraddComponent } from './additionalcostrecmasteradd.component';

describe('AdditionalcostrecmasteraddComponent', () => {
  let component: AdditionalcostrecmasteraddComponent;
  let fixture: ComponentFixture<AdditionalcostrecmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalcostrecmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalcostrecmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
