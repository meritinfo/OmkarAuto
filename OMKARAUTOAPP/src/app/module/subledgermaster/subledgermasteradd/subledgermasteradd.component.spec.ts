import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubledgermasteraddComponent } from './subledgermasteradd.component';

describe('SubledgermasteraddComponent', () => {
  let component: SubledgermasteraddComponent;
  let fixture: ComponentFixture<SubledgermasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubledgermasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubledgermasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
