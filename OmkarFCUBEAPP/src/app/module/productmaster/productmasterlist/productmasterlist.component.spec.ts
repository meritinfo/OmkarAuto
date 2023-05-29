import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmasterlistComponent } from './productmasterlist.component';

describe('ProductmasterlistComponent', () => {
  let component: ProductmasterlistComponent;
  let fixture: ComponentFixture<ProductmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
