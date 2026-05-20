import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripmasterlistComponent } from './tripmasterlist.component';

describe('TripmasterlistComponent', () => {
  let component: TripmasterlistComponent;
  let fixture: ComponentFixture<TripmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
