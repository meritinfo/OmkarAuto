import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpmasteraddComponent } from './empmasteradd.component';

describe('EmpmasteraddComponent', () => {
  let component: EmpmasteraddComponent;
  let fixture: ComponentFixture<EmpmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
