import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploanaddComponent } from './emploanadd.component';

describe('EmploanaddComponent', () => {
  let component: EmploanaddComponent;
  let fixture: ComponentFixture<EmploanaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploanaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploanaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
