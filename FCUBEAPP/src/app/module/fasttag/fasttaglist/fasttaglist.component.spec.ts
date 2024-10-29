import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasttaglistComponent } from './fasttaglist.component';

describe('FasttaglistComponent', () => {
  let component: FasttaglistComponent;
  let fixture: ComponentFixture<FasttaglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FasttaglistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FasttaglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
