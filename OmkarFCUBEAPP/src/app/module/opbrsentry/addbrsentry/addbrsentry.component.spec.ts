import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbrsentryComponent } from './addbrsentry.component';

describe('AddbrsentryComponent', () => {
  let component: AddbrsentryComponent;
  let fixture: ComponentFixture<AddbrsentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbrsentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbrsentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
