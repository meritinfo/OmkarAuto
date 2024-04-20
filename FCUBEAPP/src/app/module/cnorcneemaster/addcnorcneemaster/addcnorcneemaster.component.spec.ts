import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcnorcneemasterComponent } from './addcnorcneemaster.component';

describe('AddcnorcneemasterComponent', () => {
  let component: AddcnorcneemasterComponent;
  let fixture: ComponentFixture<AddcnorcneemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcnorcneemasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcnorcneemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
