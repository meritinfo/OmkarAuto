import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtslabmasterlistComponent } from './ptslabmasterlist.component';

describe('PtslabmasterlistComponent', () => {
  let component: PtslabmasterlistComponent;
  let fixture: ComponentFixture<PtslabmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtslabmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtslabmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
