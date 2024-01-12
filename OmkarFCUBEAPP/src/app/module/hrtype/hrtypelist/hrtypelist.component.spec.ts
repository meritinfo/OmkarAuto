import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtypelistComponent } from './hrtypelist.component';

describe('HrtypelistComponent', () => {
  let component: HrtypelistComponent;
  let fixture: ComponentFixture<HrtypelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrtypelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrtypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
