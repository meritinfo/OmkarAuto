import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegderdetaillistComponent } from './legderdetaillist.component';

describe('LegderdetaillistComponent', () => {
  let component: LegderdetaillistComponent;
  let fixture: ComponentFixture<LegderdetaillistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegderdetaillistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegderdetaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
