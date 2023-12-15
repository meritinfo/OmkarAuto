import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthertripopenlistComponent } from './othertripopenlist.component';

describe('OthertripopenlistComponent', () => {
  let component: OthertripopenlistComponent;
  let fixture: ComponentFixture<OthertripopenlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthertripopenlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthertripopenlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
