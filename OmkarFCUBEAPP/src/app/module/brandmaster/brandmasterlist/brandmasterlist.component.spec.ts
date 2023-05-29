import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandmasterlistComponent } from './brandmasterlist.component';

describe('BrandmasterlistComponent', () => {
  let component: BrandmasterlistComponent;
  let fixture: ComponentFixture<BrandmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
