import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificiarymasterlistComponent } from './benificiarymasterlist.component';

describe('BenificiarymasterlistComponent', () => {
  let component: BenificiarymasterlistComponent;
  let fixture: ComponentFixture<BenificiarymasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenificiarymasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenificiarymasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
