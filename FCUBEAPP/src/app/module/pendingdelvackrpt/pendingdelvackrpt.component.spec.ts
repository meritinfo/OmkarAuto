import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingdelvackrptComponent } from './pendingdelvackrpt.component';

describe('PendingdelvackrptComponent', () => {
  let component: PendingdelvackrptComponent;
  let fixture: ComponentFixture<PendingdelvackrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingdelvackrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingdelvackrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
