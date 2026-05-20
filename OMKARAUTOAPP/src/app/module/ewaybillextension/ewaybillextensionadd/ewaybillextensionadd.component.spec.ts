import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EwaybillextensionaddComponent } from './ewaybillextensionadd.component';

describe('EwaybillextensionaddComponent', () => {
  let component: EwaybillextensionaddComponent;
  let fixture: ComponentFixture<EwaybillextensionaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EwaybillextensionaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EwaybillextensionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
