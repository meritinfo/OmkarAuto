import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectpmtdownloadComponent } from './directpmtdownload.component';

describe('DirectpmtdownloadComponent', () => {
  let component: DirectpmtdownloadComponent;
  let fixture: ComponentFixture<DirectpmtdownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectpmtdownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectpmtdownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
