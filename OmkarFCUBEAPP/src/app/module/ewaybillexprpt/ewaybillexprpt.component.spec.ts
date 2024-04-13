import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EwaybillexprptComponent } from './ewaybillexprpt.component';

describe('EwaybillexprptComponent', () => {
  let component: EwaybillexprptComponent;
  let fixture: ComponentFixture<EwaybillexprptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EwaybillexprptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EwaybillexprptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
