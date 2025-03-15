import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanmasterllpaddComponent } from './challanmasterllpadd.component';

describe('ChallanmasterllpaddComponent', () => {
  let component: ChallanmasterllpaddComponent;
  let fixture: ComponentFixture<ChallanmasterllpaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanmasterllpaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallanmasterllpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
