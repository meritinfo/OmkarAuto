import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddratesmasterComponent } from './addratesmaster.component';

describe('AddratesmasterComponent', () => {
  let component: AddratesmasterComponent;
  let fixture: ComponentFixture<AddratesmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddratesmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddratesmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
