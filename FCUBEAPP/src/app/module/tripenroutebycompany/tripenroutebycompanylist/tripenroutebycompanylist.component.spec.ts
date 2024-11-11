import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripenroutebycompanylistComponent } from './tripenroutebycompanylist.component';

describe('TripenroutebycompanylistComponent', () => {
  let component: TripenroutebycompanylistComponent;
  let fixture: ComponentFixture<TripenroutebycompanylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripenroutebycompanylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripenroutebycompanylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
