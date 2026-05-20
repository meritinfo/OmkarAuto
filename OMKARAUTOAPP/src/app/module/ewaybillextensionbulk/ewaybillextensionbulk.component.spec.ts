import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EwaybillextensionbulkComponent } from './ewaybillextensionbulk.component';

describe('EwaybillextensionbulkComponent', () => {
  let component: EwaybillextensionbulkComponent;
  let fixture: ComponentFixture<EwaybillextensionbulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EwaybillextensionbulkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EwaybillextensionbulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
