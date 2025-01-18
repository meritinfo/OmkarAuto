import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DovehiplacedlistComponent } from './dovehiplacedlist.component';

describe('DovehiplacedlistComponent', () => {
  let component: DovehiplacedlistComponent;
  let fixture: ComponentFixture<DovehiplacedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DovehiplacedlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DovehiplacedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
