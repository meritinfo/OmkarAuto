import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingrouplistComponent } from './fingrouplist.component';

describe('FingrouplistComponent', () => {
  let component: FingrouplistComponent;
  let fixture: ComponentFixture<FingrouplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FingrouplistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FingrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
