import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorryhirepmtreqlistComponent } from './lorryhirepmtreqlist.component';

describe('LorryhirepmtreqlistComponent', () => {
  let component: LorryhirepmtreqlistComponent;
  let fixture: ComponentFixture<LorryhirepmtreqlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LorryhirepmtreqlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LorryhirepmtreqlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
