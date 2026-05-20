import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnorcneemasterlistComponent } from './cnorcneemasterlist.component';

describe('CnorcneemasterlistComponent', () => {
  let component: CnorcneemasterlistComponent;
  let fixture: ComponentFixture<CnorcneemasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnorcneemasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnorcneemasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
