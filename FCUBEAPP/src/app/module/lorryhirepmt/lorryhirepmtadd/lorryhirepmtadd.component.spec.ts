import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorryhirepmtaddComponent } from './lorryhirepmtadd.component';

describe('LorryhirepmtaddComponent', () => {
  let component: LorryhirepmtaddComponent;
  let fixture: ComponentFixture<LorryhirepmtaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LorryhirepmtaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LorryhirepmtaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
