import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DovehicleinlistComponent } from './dovehicleinlist.component';

describe('DovehicleinlistComponent', () => {
  let component: DovehicleinlistComponent;
  let fixture: ComponentFixture<DovehicleinlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DovehicleinlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DovehicleinlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
