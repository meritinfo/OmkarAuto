import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroletypeComponent } from './addroletype.component';

describe('AddroletypeComponent', () => {
  let component: AddroletypeComponent;
  let fixture: ComponentFixture<AddroletypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddroletypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddroletypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
