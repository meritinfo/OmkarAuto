import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DovehiplacedaddComponent } from './dovehiplacedadd.component';

describe('DovehiplacedaddComponent', () => {
  let component: DovehiplacedaddComponent;
  let fixture: ComponentFixture<DovehiplacedaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DovehiplacedaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DovehiplacedaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
