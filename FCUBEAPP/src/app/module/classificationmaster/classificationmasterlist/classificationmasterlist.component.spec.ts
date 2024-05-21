import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationmasterlistComponent } from './classificationmasterlist.component';

describe('ClassificationmasterlistComponent', () => {
  let component: ClassificationmasterlistComponent;
  let fixture: ComponentFixture<ClassificationmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
