import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyinfoaddComponent } from './companyinfoadd.component';

describe('CompanyinfoaddComponent', () => {
  let component: CompanyinfoaddComponent;
  let fixture: ComponentFixture<CompanyinfoaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyinfoaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyinfoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
