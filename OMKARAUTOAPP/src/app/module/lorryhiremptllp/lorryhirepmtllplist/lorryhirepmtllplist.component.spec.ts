import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorryhirepmtllplistComponent } from './lorryhirepmtllplist.component';

describe('LorryhirepmtllplistComponent', () => {
  let component: LorryhirepmtllplistComponent;
  let fixture: ComponentFixture<LorryhirepmtllplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LorryhirepmtllplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LorryhirepmtllplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
