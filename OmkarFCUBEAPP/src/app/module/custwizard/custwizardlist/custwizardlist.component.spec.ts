import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustwizardlistComponent } from './custwizardlist.component';

describe('CustwizardlistComponent', () => {
  let component: CustwizardlistComponent;
  let fixture: ComponentFixture<CustwizardlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustwizardlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustwizardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
