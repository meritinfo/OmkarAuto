import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanreleaseaddComponent } from './challanreleaseadd.component';

describe('ChallanreleaseaddComponent', () => {
  let component: ChallanreleaseaddComponent;
  let fixture: ComponentFixture<ChallanreleaseaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanreleaseaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallanreleaseaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
