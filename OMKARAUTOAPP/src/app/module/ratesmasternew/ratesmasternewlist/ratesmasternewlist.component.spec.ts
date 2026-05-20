import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesmasternewlistComponent } from './ratesmasternewlist.component';

describe('RatesmasternewlistComponent', () => {
  let component: RatesmasternewlistComponent;
  let fixture: ComponentFixture<RatesmasternewlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatesmasternewlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatesmasternewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
