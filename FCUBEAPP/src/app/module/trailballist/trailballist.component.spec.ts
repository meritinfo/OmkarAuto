import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailballistComponent } from './trailballist.component';

describe('TrailballistComponent', () => {
  let component: TrailballistComponent;
  let fixture: ComponentFixture<TrailballistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailballistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailballistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
