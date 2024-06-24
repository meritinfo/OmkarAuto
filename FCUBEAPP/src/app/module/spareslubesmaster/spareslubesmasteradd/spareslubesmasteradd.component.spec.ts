import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareslubesmasteraddComponent } from './spareslubesmasteradd.component';

describe('SpareslubesmasteraddComponent', () => {
  let component: SpareslubesmasteraddComponent;
  let fixture: ComponentFixture<SpareslubesmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpareslubesmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpareslubesmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
