import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbilledrptComponent } from './unbilledrpt.component';

describe('UnbilledrptComponent', () => {
  let component: UnbilledrptComponent;
  let fixture: ComponentFixture<UnbilledrptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbilledrptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnbilledrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
