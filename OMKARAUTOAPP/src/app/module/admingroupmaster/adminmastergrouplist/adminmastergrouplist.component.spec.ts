import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmastergrouplistComponent } from './adminmastergrouplist.component';

describe('AdminmastergrouplistComponent', () => {
  let component: AdminmastergrouplistComponent;
  let fixture: ComponentFixture<AdminmastergrouplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmastergrouplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmastergrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
