import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationdetailComponent } from './destinationdetail.component';

describe('DestinationdetailComponent', () => {
  let component: DestinationdetailComponent;
  let fixture: ComponentFixture<DestinationdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
