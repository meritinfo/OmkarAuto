import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MraddComponent } from './mradd.component';

describe('MraddComponent', () => {
  let component: MraddComponent;
  let fixture: ComponentFixture<MraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
