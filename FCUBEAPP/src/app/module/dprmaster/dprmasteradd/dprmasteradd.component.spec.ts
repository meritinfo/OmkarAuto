import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrpmasteraddComponent } from './dprmasteradd.component';

describe('DrpmasteraddComponent', () => {
  let component: DrpmasteraddComponent;
  let fixture: ComponentFixture<DrpmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrpmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrpmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
