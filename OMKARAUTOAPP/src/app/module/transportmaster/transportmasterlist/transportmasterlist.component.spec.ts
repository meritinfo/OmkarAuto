import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportmasterlistComponent } from './transportmasterlist.component';

describe('TransportmasterlistComponent', () => {
  let component: TransportmasterlistComponent;
  let fixture: ComponentFixture<TransportmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
