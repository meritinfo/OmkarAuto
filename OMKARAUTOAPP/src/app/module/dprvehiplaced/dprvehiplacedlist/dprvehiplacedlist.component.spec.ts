import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprvehiplacedlistComponent } from './dprvehiplacedlist.component';

describe('DprvehiplacedlistComponent', () => {
  let component: DprvehiplacedlistComponent;
  let fixture: ComponentFixture<DprvehiplacedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DprvehiplacedlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DprvehiplacedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
