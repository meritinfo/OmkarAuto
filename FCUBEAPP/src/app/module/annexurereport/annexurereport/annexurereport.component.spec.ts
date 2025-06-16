import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexurereportComponent } from './annexurereport.component';

describe('AnnexurereportComponent', () => {
  let component: AnnexurereportComponent;
  let fixture: ComponentFixture<AnnexurereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnexurereportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnexurereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
