import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediatescreenComponent } from './intermediatescreen.component';

describe('IntermediatescreenComponent', () => {
  let component: IntermediatescreenComponent;
  let fixture: ComponentFixture<IntermediatescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntermediatescreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntermediatescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
