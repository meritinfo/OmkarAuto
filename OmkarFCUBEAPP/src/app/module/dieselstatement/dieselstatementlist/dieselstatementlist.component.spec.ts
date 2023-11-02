import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselstatementlistComponent } from './dieselstatementlist.component';

describe('DieselstatementlistComponent', () => {
  let component: DieselstatementlistComponent;
  let fixture: ComponentFixture<DieselstatementlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieselstatementlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieselstatementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
