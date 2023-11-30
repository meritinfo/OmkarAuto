import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingroupaddComponent } from './fingroupadd.component';

describe('FingroupaddComponent', () => {
  let component: FingroupaddComponent;
  let fixture: ComponentFixture<FingroupaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FingroupaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FingroupaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
