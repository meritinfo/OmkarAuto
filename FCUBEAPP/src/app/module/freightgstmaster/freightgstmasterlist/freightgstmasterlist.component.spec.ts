import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightgstmasterlistComponent } from './freightgstmasterlist.component';

describe('FreightgstmasterlistComponent', () => {
  let component: FreightgstmasterlistComponent;
  let fixture: ComponentFixture<FreightgstmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreightgstmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreightgstmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
