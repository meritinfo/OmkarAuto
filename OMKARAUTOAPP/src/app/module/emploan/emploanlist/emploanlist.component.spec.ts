import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploanlistComponent } from './emploanlist.component';

describe('EmploanlistComponent', () => {
  let component: EmploanlistComponent;
  let fixture: ComponentFixture<EmploanlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploanlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
