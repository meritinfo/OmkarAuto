import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnorcneegstlistComponent } from './cnorcneegstlist.component';

describe('CnorcneegstlistComponent', () => {
  let component: CnorcneegstlistComponent;
  let fixture: ComponentFixture<CnorcneegstlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnorcneegstlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnorcneegstlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
