import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancemasterfreightlistComponent } from './distancemasterfreightlist.component';

describe('DistancemasterfreightlistComponent', () => {
  let component: DistancemasterfreightlistComponent;
  let fixture: ComponentFixture<DistancemasterfreightlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancemasterfreightlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancemasterfreightlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
