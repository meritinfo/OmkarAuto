import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchcustomermstaddComponent } from './branchcustomermstadd.component';

describe('BranchcustomermstaddComponent', () => {
  let component: BranchcustomermstaddComponent;
  let fixture: ComponentFixture<BranchcustomermstaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchcustomermstaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchcustomermstaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
