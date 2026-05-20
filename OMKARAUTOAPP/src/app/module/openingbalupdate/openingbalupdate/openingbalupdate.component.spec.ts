import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningbalupdateComponent } from './openingbalupdate.component';

describe('OpeningbalupdateComponent', () => {
  let component: OpeningbalupdateComponent;
  let fixture: ComponentFixture<OpeningbalupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningbalupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeningbalupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
