import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprvehiplacededitComponent } from './dprvehiplacededit.component';

describe('DprvehiplacededitComponent', () => {
  let component: DprvehiplacededitComponent;
  let fixture: ComponentFixture<DprvehiplacededitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DprvehiplacededitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DprvehiplacededitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
