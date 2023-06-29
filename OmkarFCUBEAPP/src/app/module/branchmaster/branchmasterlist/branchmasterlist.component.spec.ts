import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchmasterlistComponent } from './branchmasterlist.component';

describe('BranchmasterlistComponent', () => {
  let component: BranchmasterlistComponent;
  let fixture: ComponentFixture<BranchmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
