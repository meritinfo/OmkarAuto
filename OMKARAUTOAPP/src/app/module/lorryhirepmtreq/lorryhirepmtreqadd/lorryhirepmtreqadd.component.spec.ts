import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorryhirepmtreqaddComponent } from './lorryhirepmtreqadd.component';

describe('LorryhirepmtreqaddComponent', () => {
  let component: LorryhirepmtreqaddComponent;
  let fixture: ComponentFixture<LorryhirepmtreqaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LorryhirepmtreqaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LorryhirepmtreqaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
