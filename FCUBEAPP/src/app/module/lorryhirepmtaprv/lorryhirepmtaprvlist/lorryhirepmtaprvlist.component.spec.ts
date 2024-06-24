import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorryhirepmtaprvlistComponent } from './lorryhirepmtaprvlist.component';

describe('LorryhirepmtaprvlistComponent', () => {
  let component: LorryhirepmtaprvlistComponent;
  let fixture: ComponentFixture<LorryhirepmtaprvlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LorryhirepmtaprvlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LorryhirepmtaprvlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
