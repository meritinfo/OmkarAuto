import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinopenbalanceaddComponent } from './finopenbalanceadd.component';

describe('FinopenbalanceaddComponent', () => {
  let component: FinopenbalanceaddComponent;
  let fixture: ComponentFixture<FinopenbalanceaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinopenbalanceaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinopenbalanceaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
