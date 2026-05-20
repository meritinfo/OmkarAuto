import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartymislocationlistComponent } from './partymislocationlist.component';

describe('PartymislocationlistComponent', () => {
  let component: PartymislocationlistComponent;
  let fixture: ComponentFixture<PartymislocationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartymislocationlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartymislocationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
