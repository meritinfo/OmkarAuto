import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcostrecentrylistComponent } from './addcostrecentrylist.component';

describe('AddcostrecentrylistComponent', () => {
  let component: AddcostrecentrylistComponent;
  let fixture: ComponentFixture<AddcostrecentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcostrecentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcostrecentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
