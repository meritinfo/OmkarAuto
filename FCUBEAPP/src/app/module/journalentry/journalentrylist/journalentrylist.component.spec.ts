import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalentrylistComponent } from './journalentrylist.component';

describe('JournalentrylistComponent', () => {
  let component: JournalentrylistComponent;
  let fixture: ComponentFixture<JournalentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
