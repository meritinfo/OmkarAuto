import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddocumentallottmentComponent } from './adddocumentallottment.component';

describe('AdddocumentallottmentComponent', () => {
  let component: AdddocumentallottmentComponent;
  let fixture: ComponentFixture<AdddocumentallottmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddocumentallottmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddocumentallottmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
