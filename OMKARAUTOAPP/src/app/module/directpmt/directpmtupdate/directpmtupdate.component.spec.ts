import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectpmtupdateComponent } from './directpmtupdate.component';

describe('DirectpmtupdateComponent', () => {
  let component: DirectpmtupdateComponent;
  let fixture: ComponentFixture<DirectpmtupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectpmtupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectpmtupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
