import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploanrepaylistComponent } from './emploanrepaylist.component';

describe('EmploanrepaylistComponent', () => {
  let component: EmploanrepaylistComponent;
  let fixture: ComponentFixture<EmploanrepaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploanrepaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploanrepaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
