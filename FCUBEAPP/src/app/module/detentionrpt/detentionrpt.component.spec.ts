import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetentionrptComponent } from './detentionrpt.component';

describe('DetentionrptComponent', () => {
  let component: DetentionrptComponent;
  let fixture: ComponentFixture<DetentionrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetentionrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetentionrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
