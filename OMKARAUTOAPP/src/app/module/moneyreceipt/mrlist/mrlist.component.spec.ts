import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrlistComponent } from './mrlist.component';

describe('MrlistComponent', () => {
  let component: MrlistComponent;
  let fixture: ComponentFixture<MrlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
