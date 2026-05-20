import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangebranchComponent } from './changebranch.component';

describe('ChangebranchComponent', () => {
  let component: ChangebranchComponent;
  let fixture: ComponentFixture<ChangebranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangebranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangebranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
