import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareslubesmasterlistComponent } from './spareslubesmasterlist.component';

describe('SpareslubesmasterlistComponent', () => {
  let component: SpareslubesmasterlistComponent;
  let fixture: ComponentFixture<SpareslubesmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpareslubesmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpareslubesmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
