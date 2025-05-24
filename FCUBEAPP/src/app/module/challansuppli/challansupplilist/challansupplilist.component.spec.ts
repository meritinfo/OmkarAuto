import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallansupplilistComponent } from './challansupplilist.component';

describe('ChallansupplilistComponent', () => {
  let component: ChallansupplilistComponent;
  let fixture: ComponentFixture<ChallansupplilistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallansupplilistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallansupplilistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
