import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentmasterlistComponent } from './documentmasterlist.component';

describe('DocumentmasterlistComponent', () => {
  let component: DocumentmasterlistComponent;
  let fixture: ComponentFixture<DocumentmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
