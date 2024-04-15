import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstsalesregisterrptlistComponent } from './gstsalesregisterrptlist.component';

describe('GstsalesregisterrptlistComponent', () => {
  let component: GstsalesregisterrptlistComponent;
  let fixture: ComponentFixture<GstsalesregisterrptlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstsalesregisterrptlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstsalesregisterrptlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
