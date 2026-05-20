import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnorcneegstaddComponent } from './cnorcneegstadd.component';

describe('CnorcneegstaddComponent', () => {
  let component: CnorcneegstaddComponent;
  let fixture: ComponentFixture<CnorcneegstaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnorcneegstaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnorcneegstaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
