import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripmarginsummaryrptComponent } from './tripmarginsummaryrpt.component';

describe('TripmarginsummaryrptComponent', () => {
  let component: TripmarginsummaryrptComponent;
  let fixture: ComponentFixture<TripmarginsummaryrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripmarginsummaryrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripmarginsummaryrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
