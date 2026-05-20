import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripenroutebycompanyaddComponent } from './tripenroutebycompanyadd.component';

describe('TripenroutebycompanyaddComponent', () => {
  let component: TripenroutebycompanyaddComponent;
  let fixture: ComponentFixture<TripenroutebycompanyaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripenroutebycompanyaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripenroutebycompanyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
