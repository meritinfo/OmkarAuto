import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorduerptlistComponent } from './vendorduerptlist.component';

describe('VendorduerptlistComponent', () => {
  let component: VendorduerptlistComponent;
  let fixture: ComponentFixture<VendorduerptlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorduerptlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorduerptlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
