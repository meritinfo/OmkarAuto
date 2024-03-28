import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappaystatementlistComponent } from './happaystatementlist.component';

describe('HappaystatementlistComponent', () => {
  let component: HappaystatementlistComponent;
  let fixture: ComponentFixture<HappaystatementlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HappaystatementlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HappaystatementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
