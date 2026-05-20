import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EwaybillextensionlistComponent } from './ewaybillextensionlist.component';

describe('EwaybillextensionlistComponent', () => {
  let component: EwaybillextensionlistComponent;
  let fixture: ComponentFixture<EwaybillextensionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EwaybillextensionlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EwaybillextensionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
