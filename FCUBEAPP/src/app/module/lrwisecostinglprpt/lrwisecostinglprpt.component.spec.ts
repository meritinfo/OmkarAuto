import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrwisecostinglprptComponent } from './lrwisecostinglprpt.component';

describe('LrwisecostinglprptComponent', () => {
  let component: LrwisecostinglprptComponent;
  let fixture: ComponentFixture<LrwisecostinglprptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrwisecostinglprptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LrwisecostinglprptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
