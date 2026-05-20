import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrpmasterlistComponent } from './dprmasterlist.component';

describe('DrpmasterlistComponent', () => {
  let component: DrpmasterlistComponent;
  let fixture: ComponentFixture<DrpmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrpmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrpmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
