import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentallottmentlistComponent } from './documentallottmentlist.component';

describe('DocumentallottmentlistComponent', () => {
  let component: DocumentallottmentlistComponent;
  let fixture: ComponentFixture<DocumentallottmentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentallottmentlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentallottmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
