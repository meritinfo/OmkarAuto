import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocallotmentllpaddComponent } from './docallotmentllpadd.component';

describe('DocallotmentllpaddComponent', () => {
  let component: DocallotmentllpaddComponent;
  let fixture: ComponentFixture<DocallotmentllpaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocallotmentllpaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocallotmentllpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
