import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparespurchasemasterlistComponent } from './sparespurchasemasterlist.component';

describe('SparespurchasemasterlistComponent', () => {
  let component: SparespurchasemasterlistComponent;
  let fixture: ComponentFixture<SparespurchasemasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparespurchasemasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparespurchasemasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
