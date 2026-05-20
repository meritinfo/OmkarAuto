import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorryhirepmtllpaddComponent } from './lorryhirepmtllpadd.component';

describe('LorryhirepmtllpaddComponent', () => {
  let component: LorryhirepmtllpaddComponent;
  let fixture: ComponentFixture<LorryhirepmtllpaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LorryhirepmtllpaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LorryhirepmtllpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
