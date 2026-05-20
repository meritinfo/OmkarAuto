import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanreleaselistComponent } from './challanreleaselist.component';

describe('ChallanreleaselistComponent', () => {
  let component: ChallanreleaselistComponent;
  let fixture: ComponentFixture<ChallanreleaselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanreleaselistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallanreleaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
