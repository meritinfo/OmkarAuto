import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehicletypemasterComponent } from './addvehicletypemaster.component';

describe('AddvehicletypemasterComponent', () => {
  let component: AddvehicletypemasterComponent;
  let fixture: ComponentFixture<AddvehicletypemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvehicletypemasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddvehicletypemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
