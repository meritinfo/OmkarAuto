import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedopenbalComponent } from './consolidatedopenbal.component';

describe('ConsolidatedopenbalComponent', () => {
  let component: ConsolidatedopenbalComponent;
  let fixture: ComponentFixture<ConsolidatedopenbalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatedopenbalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidatedopenbalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
