import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanmasterlistComponent } from './challanmasterlist.component';

describe('ChallanmasterlistComponent', () => {
  let component: ChallanmasterlistComponent;
  let fixture: ComponentFixture<ChallanmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallanmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
