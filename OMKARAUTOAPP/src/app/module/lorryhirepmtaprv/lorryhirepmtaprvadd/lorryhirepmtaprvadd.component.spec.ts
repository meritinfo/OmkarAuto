import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorryhirepmtaprvaddComponent } from './lorryhirepmtaprvadd.component';

describe('LorryhirepmtaprvaddComponent', () => {
  let component: LorryhirepmtaprvaddComponent;
  let fixture: ComponentFixture<LorryhirepmtaprvaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LorryhirepmtaprvaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LorryhirepmtaprvaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
