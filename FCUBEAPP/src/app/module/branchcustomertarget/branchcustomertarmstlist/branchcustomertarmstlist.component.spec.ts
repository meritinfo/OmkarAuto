import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchcustomertarmstlistComponent } from './branchcustomertarmstlist.component';

describe('BranchcustomertarmstlistComponent', () => {
  let component: BranchcustomertarmstlistComponent;
  let fixture: ComponentFixture<BranchcustomertarmstlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchcustomertarmstlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchcustomertarmstlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
