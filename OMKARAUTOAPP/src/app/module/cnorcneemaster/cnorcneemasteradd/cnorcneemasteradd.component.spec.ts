import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnorcneemasteraddComponent } from './cnorcneemasteradd.component';

describe('CnorcneemasteraddComponent', () => {
  let component: CnorcneemasteraddComponent;
  let fixture: ComponentFixture<CnorcneemasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnorcneemasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnorcneemasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
