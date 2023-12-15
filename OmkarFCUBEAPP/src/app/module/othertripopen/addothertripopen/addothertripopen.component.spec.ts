import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddothertripopenComponent } from './addothertripopen.component';

describe('AddothertripopenComponent', () => {
  let component: AddothertripopenComponent;
  let fixture: ComponentFixture<AddothertripopenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddothertripopenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddothertripopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
