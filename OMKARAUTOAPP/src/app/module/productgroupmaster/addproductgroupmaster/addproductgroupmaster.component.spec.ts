import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductgroupmasterComponent } from './addproductgroupmaster.component';

describe('AddproductgroupmasterComponent', () => {
  let component: AddproductgroupmasterComponent;
  let fixture: ComponentFixture<AddproductgroupmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddproductgroupmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproductgroupmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
