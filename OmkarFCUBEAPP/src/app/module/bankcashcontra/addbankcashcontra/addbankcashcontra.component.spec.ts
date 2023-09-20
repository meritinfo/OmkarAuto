import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbankcashcontraComponent } from './addbankcashcontra.component';

describe('AddbankcashcontraComponent', () => {
  let component: AddbankcashcontraComponent;
  let fixture: ComponentFixture<AddbankcashcontraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbankcashcontraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbankcashcontraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
