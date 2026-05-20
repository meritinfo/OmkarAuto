import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitnoteaddComponent } from './debitnoteadd.component';

describe('DebitnoteaddComponent', () => {
  let component: DebitnoteaddComponent;
  let fixture: ComponentFixture<DebitnoteaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitnoteaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitnoteaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
