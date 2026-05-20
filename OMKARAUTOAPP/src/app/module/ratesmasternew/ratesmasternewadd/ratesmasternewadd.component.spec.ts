import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesmasternewaddComponent } from './ratesmasternewadd.component';

describe('RatesmasternewaddComponent', () => {
  let component: RatesmasternewaddComponent;
  let fixture: ComponentFixture<RatesmasternewaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatesmasternewaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatesmasternewaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
