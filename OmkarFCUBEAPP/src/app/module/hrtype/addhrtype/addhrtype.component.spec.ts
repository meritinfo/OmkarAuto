import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhrtypeComponent } from './addhrtype.component';

describe('AddhrtypeComponent', () => {
  let component: AddhrtypeComponent;
  let fixture: ComponentFixture<AddhrtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddhrtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddhrtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
