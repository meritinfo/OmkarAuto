import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtruckmasterComponent } from './addtruckmaster.component';

describe('AddtruckmasterComponent', () => {
  let component: AddtruckmasterComponent;
  let fixture: ComponentFixture<AddtruckmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtruckmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtruckmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
