import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprplacevehicleComponent } from './dprplacevehicle.component';

describe('DprplacevehicleComponent', () => {
  let component: DprplacevehicleComponent;
  let fixture: ComponentFixture<DprplacevehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DprplacevehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DprplacevehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
