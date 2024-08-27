import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratetempgceditComponent } from './generatetempgcedit.component';

describe('GeneratetempgceditComponent', () => {
  let component: GeneratetempgceditComponent;
  let fixture: ComponentFixture<GeneratetempgceditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratetempgceditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratetempgceditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
