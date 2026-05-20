import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddptslabmasterComponent } from './addptslabmaster.component';

describe('AddptslabmasterComponent', () => {
  let component: AddptslabmasterComponent;
  let fixture: ComponentFixture<AddptslabmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddptslabmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddptslabmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
