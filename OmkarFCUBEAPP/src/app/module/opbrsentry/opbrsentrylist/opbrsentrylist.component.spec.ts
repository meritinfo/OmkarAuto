import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpbrsentrylistComponent } from './opbrsentrylist.component';

describe('OpbrsentrylistComponent', () => {
  let component: OpbrsentrylistComponent;
  let fixture: ComponentFixture<OpbrsentrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpbrsentrylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpbrsentrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
