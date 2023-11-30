import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaccountsmasteraddComponent } from './finaccountsmasteradd.component';

describe('FinaccountsmasteraddComponent', () => {
  let component: FinaccountsmasteraddComponent;
  let fixture: ComponentFixture<FinaccountsmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinaccountsmasteraddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinaccountsmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
