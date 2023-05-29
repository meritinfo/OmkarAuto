import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddocrenewalmasterComponent } from './adddocrenewalmaster.component';

describe('AdddocrenewalmasterComponent', () => {
  let component: AdddocrenewalmasterComponent;
  let fixture: ComponentFixture<AdddocrenewalmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddocrenewalmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddocrenewalmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
