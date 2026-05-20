import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripmasteraddComponent } from './tripmasteradd.component';

describe('TripmasteraddComponent', () => {
  let component: TripmasteraddComponent;
  let fixture: ComponentFixture<TripmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
