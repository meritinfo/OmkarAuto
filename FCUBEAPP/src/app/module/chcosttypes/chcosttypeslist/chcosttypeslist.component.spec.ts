import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChcosttypeslistComponent } from './chcosttypeslist.component';

describe('ChcosttypeslistComponent', () => {
  let component: ChcosttypeslistComponent;
  let fixture: ComponentFixture<ChcosttypeslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChcosttypeslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChcosttypeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
