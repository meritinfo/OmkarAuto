import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanmasterlistllpComponent } from './challanmasterlistllp.component';

describe('ChallanmasterlistllpComponent', () => {
  let component: ChallanmasterlistllpComponent;
  let fixture: ComponentFixture<ChallanmasterlistllpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanmasterlistllpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallanmasterlistllpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
