import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustwizardaddComponent } from './custwizardadd.component';

describe('CustwizardaddComponent', () => {
  let component: CustwizardaddComponent;
  let fixture: ComponentFixture<CustwizardaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustwizardaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustwizardaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
