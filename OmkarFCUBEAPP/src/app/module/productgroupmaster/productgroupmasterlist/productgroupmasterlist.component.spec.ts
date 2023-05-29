import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductgroupmasterlistComponent } from './productgroupmasterlist.component';

describe('ProductgroupmasterlistComponent', () => {
  let component: ProductgroupmasterlistComponent;
  let fixture: ComponentFixture<ProductgroupmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductgroupmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductgroupmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
