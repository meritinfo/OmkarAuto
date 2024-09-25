import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificiarymasteraddComponent } from './benificiarymasteradd.component';

describe('BenificiarymasteraddComponent', () => {
  let component: BenificiarymasteraddComponent;
  let fixture: ComponentFixture<BenificiarymasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenificiarymasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenificiarymasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
