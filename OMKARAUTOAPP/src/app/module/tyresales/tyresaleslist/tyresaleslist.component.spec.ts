import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyresaleslistComponent } from './tyresaleslist.component';

describe('TyresaleslistComponent', () => {
  let component: TyresaleslistComponent;
  let fixture: ComponentFixture<TyresaleslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyresaleslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyresaleslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
