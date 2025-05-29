import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartymisrptComponent } from './partymisrpt.component';

describe('PartymisrptComponent', () => {
  let component: PartymisrptComponent;
  let fixture: ComponentFixture<PartymisrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartymisrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartymisrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
