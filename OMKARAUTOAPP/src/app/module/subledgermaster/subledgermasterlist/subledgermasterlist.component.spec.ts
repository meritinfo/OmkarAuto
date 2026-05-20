import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubledgermasterlistComponent } from './subledgermasterlist.component';

describe('SubledgermasterlistComponent', () => {
  let component: SubledgermasterlistComponent;
  let fixture: ComponentFixture<SubledgermasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubledgermasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubledgermasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
