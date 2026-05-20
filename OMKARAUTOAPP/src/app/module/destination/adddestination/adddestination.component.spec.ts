import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddestinationComponent } from './adddestination.component';

describe('AdddestinationComponent', () => {
  let component: AdddestinationComponent;
  let fixture: ComponentFixture<AdddestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddestinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
