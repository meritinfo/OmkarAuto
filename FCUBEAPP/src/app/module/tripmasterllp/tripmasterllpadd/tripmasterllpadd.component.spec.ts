import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripmasterllpaddComponent } from './tripmasterllpadd.component';

describe('TripmasterllpaddComponent', () => {
  let component: TripmasterllpaddComponent;
  let fixture: ComponentFixture<TripmasterllpaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripmasterllpaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripmasterllpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
