import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehicletypegroupmasterComponent } from './addvehicletypegroupmaster.component';

describe('AddvehicletypegroupmasterComponent', () => {
  let component: AddvehicletypegroupmasterComponent;
  let fixture: ComponentFixture<AddvehicletypegroupmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvehicletypegroupmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddvehicletypegroupmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
