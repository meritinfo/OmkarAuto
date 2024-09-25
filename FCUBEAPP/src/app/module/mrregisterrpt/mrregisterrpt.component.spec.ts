import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrregisterrptComponent } from './mrregisterrpt.component';

describe('MrregisterrptComponent', () => {
  let component: MrregisterrptComponent;
  let fixture: ComponentFixture<MrregisterrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrregisterrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrregisterrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
