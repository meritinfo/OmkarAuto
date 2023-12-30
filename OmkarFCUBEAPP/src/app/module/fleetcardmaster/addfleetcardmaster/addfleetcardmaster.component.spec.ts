import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfleetcardmasterComponent } from './addfleetcardmaster.component';

describe('AddfleetcardmasterComponent', () => {
  let component: AddfleetcardmasterComponent;
  let fixture: ComponentFixture<AddfleetcardmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfleetcardmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfleetcardmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
