import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparesstockrptComponent } from './sparesstockrpt.component';

describe('SparesstockrptComponent', () => {
  let component: SparesstockrptComponent;
  let fixture: ComponentFixture<SparesstockrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparesstockrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparesstockrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
