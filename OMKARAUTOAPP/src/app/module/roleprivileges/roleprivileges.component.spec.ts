import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleprivilegesComponent } from './roleprivileges.component';

describe('RoleprivilegesComponent', () => {
  let component: RoleprivilegesComponent;
  let fixture: ComponentFixture<RoleprivilegesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleprivilegesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleprivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
