import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetcardreturntransferaddComponent } from './fleetcardreturntransferadd.component';

describe('FleetcardreturntransferaddComponent', () => {
  let component: FleetcardreturntransferaddComponent;
  let fixture: ComponentFixture<FleetcardreturntransferaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetcardreturntransferaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetcardreturntransferaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
