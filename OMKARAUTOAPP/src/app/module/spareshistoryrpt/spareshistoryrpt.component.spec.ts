import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareshistoryrptComponent } from './spareshistoryrpt.component';

describe('SpareshistoryrptComponent', () => {
  let component: SpareshistoryrptComponent;
  let fixture: ComponentFixture<SpareshistoryrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpareshistoryrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpareshistoryrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
