import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallansupplilistllpComponent } from './challansupplilistllp.component';

describe('ChallansupplilistllpComponent', () => {
  let component: ChallansupplilistllpComponent;
  let fixture: ComponentFixture<ChallansupplilistllpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallansupplilistllpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallansupplilistllpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
