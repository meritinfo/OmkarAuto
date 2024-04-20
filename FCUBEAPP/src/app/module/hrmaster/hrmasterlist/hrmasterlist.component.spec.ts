import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmasterlistComponent } from './hrmasterlist.component';

describe('HrmasterlistComponent', () => {
  let component: HrmasterlistComponent;
  let fixture: ComponentFixture<HrmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
