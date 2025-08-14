import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlttypegroupmstlistComponent } from './flttypegroupmstlist.component';

describe('FlttypegroupmstlistComponent', () => {
  let component: FlttypegroupmstlistComponent;
  let fixture: ComponentFixture<FlttypegroupmstlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlttypegroupmstlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlttypegroupmstlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
