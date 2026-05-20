import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmastergroupaddComponent } from './adminmastergroupadd.component';

describe('AdminmastergroupaddComponent', () => {
  let component: AdminmastergroupaddComponent;
  let fixture: ComponentFixture<AdminmastergroupaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmastergroupaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmastergroupaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
