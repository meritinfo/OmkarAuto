import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratetempgclistComponent } from './generatetempgclist.component';

describe('GeneratetempgclistComponent', () => {
  let component: GeneratetempgclistComponent;
  let fixture: ComponentFixture<GeneratetempgclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratetempgclistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratetempgclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
