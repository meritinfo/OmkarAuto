import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratetempgcaddComponent } from './generatetempgcadd.component';

describe('GeneratetempgcaddComponent', () => {
  let component: GeneratetempgcaddComponent;
  let fixture: ComponentFixture<GeneratetempgcaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratetempgcaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratetempgcaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
