import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappaystatementrptComponent } from './happaystatementrpt.component';

describe('HappaystatementrptComponent', () => {
  let component: HappaystatementrptComponent;
  let fixture: ComponentFixture<HappaystatementrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HappaystatementrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HappaystatementrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
