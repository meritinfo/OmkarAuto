import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocallotmentllplistComponent } from './docallotmentllplist.component';

describe('DocallotmentllplistComponent', () => {
  let component: DocallotmentllplistComponent;
  let fixture: ComponentFixture<DocallotmentllplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocallotmentllplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocallotmentllplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
