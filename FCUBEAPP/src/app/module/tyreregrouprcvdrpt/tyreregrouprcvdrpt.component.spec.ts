import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreregrouprcvdrptComponent } from './tyreregrouprcvdrpt.component';

describe('TyreregrouprcvdrptComponent', () => {
  let component: TyreregrouprcvdrptComponent;
  let fixture: ComponentFixture<TyreregrouprcvdrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreregrouprcvdrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreregrouprcvdrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
