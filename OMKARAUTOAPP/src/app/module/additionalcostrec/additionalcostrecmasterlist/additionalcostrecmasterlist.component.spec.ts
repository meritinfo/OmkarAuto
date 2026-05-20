import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalcostrecmasterlistComponent } from './additionalcostrecmasterlist.component';

describe('AdditionalcostrecmasterlistComponent', () => {
  let component: AdditionalcostrecmasterlistComponent;
  let fixture: ComponentFixture<AdditionalcostrecmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalcostrecmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalcostrecmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
