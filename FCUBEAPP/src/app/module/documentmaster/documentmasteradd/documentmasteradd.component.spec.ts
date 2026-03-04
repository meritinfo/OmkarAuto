import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentmasteraddComponent } from './documentmasteradd.component';

describe('DocumentmasteraddComponent', () => {
  let component: DocumentmasteraddComponent;
  let fixture: ComponentFixture<DocumentmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
