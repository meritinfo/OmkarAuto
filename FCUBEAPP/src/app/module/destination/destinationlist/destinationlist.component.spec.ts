import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationlistComponent } from './destinationlist.component';

describe('DestinationlistComponent', () => {
  let component: DestinationlistComponent;
  let fixture: ComponentFixture<DestinationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
