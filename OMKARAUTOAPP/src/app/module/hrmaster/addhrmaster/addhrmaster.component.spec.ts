import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhrmasterComponent } from './addhrmaster.component';

describe('AddhrmasterComponent', () => {
  let component: AddhrmasterComponent;
  let fixture: ComponentFixture<AddhrmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddhrmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddhrmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
