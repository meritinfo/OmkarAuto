import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehiclefltmasterComponent } from './addvehiclefltmaster.component';

describe('AddvehiclefltmasterComponent', () => {
  let component: AddvehiclefltmasterComponent;
  let fixture: ComponentFixture<AddvehiclefltmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvehiclefltmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddvehiclefltmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
