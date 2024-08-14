import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparespurchasemasteraddComponent } from './sparespurchasemasteradd.component';

describe('SparespurchasemasteraddComponent', () => {
  let component: SparespurchasemasteraddComponent;
  let fixture: ComponentFixture<SparespurchasemasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparespurchasemasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparespurchasemasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
