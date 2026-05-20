import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationmasteraddComponent } from './classificationmasteradd.component';

describe('ClassificationmasteraddComponent', () => {
  let component: ClassificationmasteraddComponent;
  let fixture: ComponentFixture<ClassificationmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
