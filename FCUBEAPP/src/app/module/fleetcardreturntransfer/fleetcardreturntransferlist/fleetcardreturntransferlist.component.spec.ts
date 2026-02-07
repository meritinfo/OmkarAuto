import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetcardreturntransferlistComponent } from './fleetcardreturntransferlist.component';

describe('FleetcardreturntransferlistComponent', () => {
  let component: FleetcardreturntransferlistComponent;
  let fixture: ComponentFixture<FleetcardreturntransferlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetcardreturntransferlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetcardreturntransferlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
