import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddratetypesComponent } from './addratetypes.component';

describe('AddratetypesComponent', () => {
  let component: AddratetypesComponent;
  let fixture: ComponentFixture<AddratetypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddratetypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddratetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
