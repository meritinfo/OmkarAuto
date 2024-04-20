import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbankreceiptentryComponent } from './addbankreceiptentry.component';

describe('AddbankreceiptentryComponent', () => {
  let component: AddbankreceiptentryComponent;
  let fixture: ComponentFixture<AddbankreceiptentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbankreceiptentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbankreceiptentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
