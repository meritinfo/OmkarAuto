import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesmasterlistComponent } from './ratesmasterlist.component';

describe('RatesmasterlistComponent', () => {
  let component: RatesmasterlistComponent;
  let fixture: ComponentFixture<RatesmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatesmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatesmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
