import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlttypegroupmstaddComponent } from './flttypegroupmstadd.component';

describe('FlttypegroupmstaddComponent', () => {
  let component: FlttypegroupmstaddComponent;
  let fixture: ComponentFixture<FlttypegroupmstaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlttypegroupmstaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlttypegroupmstaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
