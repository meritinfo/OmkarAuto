import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstsalesregisterComponent } from './gstsalesregister.component';

describe('GstsalesregisterComponent', () => {
  let component: GstsalesregisterComponent;
  let fixture: ComponentFixture<GstsalesregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstsalesregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstsalesregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
