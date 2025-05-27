import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverydisputerptComponent } from './deliverydisputerpt.component';

describe('DeliverydisputerptComponent', () => {
  let component: DeliverydisputerptComponent;
  let fixture: ComponentFixture<DeliverydisputerptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverydisputerptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverydisputerptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
