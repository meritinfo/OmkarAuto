import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallansuppliaddComponent } from './challansuppliadd.component';

describe('ChallansuppliaddComponent', () => {
  let component: ChallansuppliaddComponent;
  let fixture: ComponentFixture<ChallansuppliaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallansuppliaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallansuppliaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
