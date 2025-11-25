import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PltransferComponent } from './pltransfer.component';

describe('PltransferComponent', () => {
  let component: PltransferComponent;
  let fixture: ComponentFixture<PltransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PltransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PltransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
