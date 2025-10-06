import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclelasttransdaterptComponent } from './vehiclelasttransdaterpt.component';

describe('VehiclelasttransdaterptComponent', () => {
  let component: VehiclelasttransdaterptComponent;
  let fixture: ComponentFixture<VehiclelasttransdaterptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclelasttransdaterptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclelasttransdaterptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
