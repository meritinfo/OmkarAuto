import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatetypeslistComponent } from './ratetypeslist.component';

describe('RatetypeslistComponent', () => {
  let component: RatetypeslistComponent;
  let fixture: ComponentFixture<RatetypeslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatetypeslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatetypeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
