import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DovehiplacededitComponent } from './dovehiplacededit.component';

describe('DovehiplacededitComponent', () => {
  let component: DovehiplacededitComponent;
  let fixture: ComponentFixture<DovehiplacededitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DovehiplacededitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DovehiplacededitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
