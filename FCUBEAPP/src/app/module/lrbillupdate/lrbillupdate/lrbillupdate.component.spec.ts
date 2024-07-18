import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrbillupdateComponent } from './lrbillupdate.component';

describe('LrbillupdateComponent', () => {
  let component: LrbillupdateComponent;
  let fixture: ComponentFixture<LrbillupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrbillupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LrbillupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
