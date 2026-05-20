import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallantdsstmtrptComponent } from './challantdsstmtrpt.component';

describe('ChallantdsstmtrptComponent', () => {
  let component: ChallantdsstmtrptComponent;
  let fixture: ComponentFixture<ChallantdsstmtrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallantdsstmtrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallantdsstmtrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
