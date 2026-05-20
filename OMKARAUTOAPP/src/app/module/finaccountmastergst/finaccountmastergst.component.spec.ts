import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaccountmastergstComponent } from './finaccountmastergst.component';

describe('FinaccountmastergstComponent', () => {
  let component: FinaccountmastergstComponent;
  let fixture: ComponentFixture<FinaccountmastergstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinaccountmastergstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinaccountmastergstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
