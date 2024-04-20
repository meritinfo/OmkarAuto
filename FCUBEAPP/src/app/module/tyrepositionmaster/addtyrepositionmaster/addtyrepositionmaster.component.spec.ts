import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtyrepositionmasterComponent } from './addtyrepositionmaster.component';

describe('AddtyrepositionmasterComponent', () => {
  let component: AddtyrepositionmasterComponent;
  let fixture: ComponentFixture<AddtyrepositionmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtyrepositionmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtyrepositionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
