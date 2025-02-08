import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DovehicleinaddComponent } from './dovehicleinadd.component';

describe('DovehicleinaddComponent', () => {
  let component: DovehicleinaddComponent;
  let fixture: ComponentFixture<DovehicleinaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DovehicleinaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DovehicleinaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
