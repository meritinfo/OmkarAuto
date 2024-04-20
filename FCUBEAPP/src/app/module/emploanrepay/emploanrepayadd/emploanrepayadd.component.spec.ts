import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploanrepayaddComponent } from './emploanrepayadd.component';

describe('EmploanrepayaddComponent', () => {
  let component: EmploanrepayaddComponent;
  let fixture: ComponentFixture<EmploanrepayaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploanrepayaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploanrepayaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
