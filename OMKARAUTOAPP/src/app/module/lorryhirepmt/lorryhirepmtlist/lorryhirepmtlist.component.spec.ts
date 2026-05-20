import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorryhirepmtlistComponent } from './lorryhirepmtlist.component';

describe('LorryhirepmtlistComponent', () => {
  let component: LorryhirepmtlistComponent;
  let fixture: ComponentFixture<LorryhirepmtlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LorryhirepmtlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LorryhirepmtlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
