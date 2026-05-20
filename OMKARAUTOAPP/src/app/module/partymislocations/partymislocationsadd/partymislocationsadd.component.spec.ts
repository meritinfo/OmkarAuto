import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartymislocationsaddComponent } from './partymislocationsadd.component';

describe('PartymislocationsaddComponent', () => {
  let component: PartymislocationsaddComponent;
  let fixture: ComponentFixture<PartymislocationsaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartymislocationsaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartymislocationsaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
