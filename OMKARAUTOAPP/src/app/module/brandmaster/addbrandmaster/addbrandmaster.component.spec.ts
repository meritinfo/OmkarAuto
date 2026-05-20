import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbrandmasterComponent } from './addbrandmaster.component';

describe('AddbrandmasterComponent', () => {
  let component: AddbrandmasterComponent;
  let fixture: ComponentFixture<AddbrandmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbrandmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbrandmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
