import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightgstmasteraddComponent } from './freightgstmasteradd.component';

describe('FreightgstmasteraddComponent', () => {
  let component: FreightgstmasteraddComponent;
  let fixture: ComponentFixture<FreightgstmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreightgstmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreightgstmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
