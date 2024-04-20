import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbranchmasterComponent } from './addbranchmaster.component';

describe('AddbranchmasterComponent', () => {
  let component: AddbranchmasterComponent;
  let fixture: ComponentFixture<AddbranchmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbranchmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbranchmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
