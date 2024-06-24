import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyremodellistComponent } from './tyremodellist.component';

describe('TyremodellistComponent', () => {
  let component: TyremodellistComponent;
  let fixture: ComponentFixture<TyremodellistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyremodellistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyremodellistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
