import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselstatementaddComponent } from './dieselstatementadd.component';

describe('DieselstatementaddComponent', () => {
  let component: DieselstatementaddComponent;
  let fixture: ComponentFixture<DieselstatementaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieselstatementaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieselstatementaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
