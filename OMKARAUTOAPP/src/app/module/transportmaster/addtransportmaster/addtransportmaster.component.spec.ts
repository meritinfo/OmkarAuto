import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtransportmasterComponent } from './addtransportmaster.component';

describe('AddtransportmasterComponent', () => {
  let component: AddtransportmasterComponent;
  let fixture: ComponentFixture<AddtransportmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtransportmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtransportmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
