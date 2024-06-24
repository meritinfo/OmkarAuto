import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyremodeladdComponent } from './tyremodeladd.component';

describe('TyremodeladdComponent', () => {
  let component: TyremodeladdComponent;
  let fixture: ComponentFixture<TyremodeladdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyremodeladdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyremodeladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
