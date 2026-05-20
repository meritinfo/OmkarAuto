import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckmasterlistComponent } from './truckmasterlist.component';

describe('TruckmasterlistComponent', () => {
  let component: TruckmasterlistComponent;
  let fixture: ComponentFixture<TruckmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
