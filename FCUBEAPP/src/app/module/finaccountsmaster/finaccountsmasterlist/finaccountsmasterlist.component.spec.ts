import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaccountsmasterlistComponent } from './finaccountsmasterlist.component';

describe('FinaccountsmasterlistComponent', () => {
  let component: FinaccountsmasterlistComponent;
  let fixture: ComponentFixture<FinaccountsmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinaccountsmasterlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinaccountsmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
