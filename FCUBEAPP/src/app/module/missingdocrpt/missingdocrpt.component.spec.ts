import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingdocrptComponent } from './missingdocrpt.component';

describe('MissingdocrptComponent', () => {
  let component: MissingdocrptComponent;
  let fixture: ComponentFixture<MissingdocrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingdocrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingdocrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
