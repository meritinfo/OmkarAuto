import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappaystatementaddComponent } from './happaystatementadd.component';

describe('HappaystatementaddComponent', () => {
  let component: HappaystatementaddComponent;
  let fixture: ComponentFixture<HappaystatementaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HappaystatementaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HappaystatementaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
