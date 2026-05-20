import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountofdocenteredrptComponent } from './countofdocenteredrpt.component';

describe('CountofdocenteredrptComponent', () => {
  let component: CountofdocenteredrptComponent;
  let fixture: ComponentFixture<CountofdocenteredrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountofdocenteredrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountofdocenteredrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
