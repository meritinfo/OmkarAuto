import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocrenewalmasterlistComponent } from './docrenewalmasterlist.component';

describe('DocrenewalmasterlistComponent', () => {
  let component: DocrenewalmasterlistComponent;
  let fixture: ComponentFixture<DocrenewalmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocrenewalmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocrenewalmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
