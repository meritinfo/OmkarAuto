import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpmasterlistComponent } from './empmasterlist.component';

describe('EmpmasterlistComponent', () => {
  let component: EmpmasterlistComponent;
  let fixture: ComponentFixture<EmpmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
