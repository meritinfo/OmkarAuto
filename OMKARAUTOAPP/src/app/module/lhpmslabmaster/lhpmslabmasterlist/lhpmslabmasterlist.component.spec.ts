import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhpmslabmasterlistComponent } from './lhpmslabmasterlist.component';

describe('LhpmslabmasterlistComponent', () => {
  let component: LhpmslabmasterlistComponent;
  let fixture: ComponentFixture<LhpmslabmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhpmslabmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LhpmslabmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
