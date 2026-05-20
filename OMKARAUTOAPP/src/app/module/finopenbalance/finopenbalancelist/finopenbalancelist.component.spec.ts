import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinopenbalancelistComponent } from './finopenbalancelist.component';

describe('FinopenbalancelistComponent', () => {
  let component: FinopenbalancelistComponent;
  let fixture: ComponentFixture<FinopenbalancelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinopenbalancelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinopenbalancelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
