import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprvehiplacedaddComponent } from './dprvehiplacedadd.component';

describe('DprvehiplacedaddComponent', () => {
  let component: DprvehiplacedaddComponent;
  let fixture: ComponentFixture<DprvehiplacedaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DprvehiplacedaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DprvehiplacedaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
