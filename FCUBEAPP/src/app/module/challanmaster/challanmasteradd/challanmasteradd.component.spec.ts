import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanmasteraddComponent } from './challanmasteradd.component';

describe('ChallanmasteraddComponent', () => {
  let component: ChallanmasteraddComponent;
  let fixture: ComponentFixture<ChallanmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallanmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
