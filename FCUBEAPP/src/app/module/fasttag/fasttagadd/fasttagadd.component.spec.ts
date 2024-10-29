import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasttagaddComponent } from './fasttagadd.component';

describe('FasttagaddComponent', () => {
  let component: FasttagaddComponent;
  let fixture: ComponentFixture<FasttagaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FasttagaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FasttagaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
