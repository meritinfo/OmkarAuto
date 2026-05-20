import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallansuppliaddllpComponent } from './challansuppliaddllp.component';

describe('ChallansuppliaddllpComponent', () => {
  let component: ChallansuppliaddllpComponent;
  let fixture: ComponentFixture<ChallansuppliaddllpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallansuppliaddllpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallansuppliaddllpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
