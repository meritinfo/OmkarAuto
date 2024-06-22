import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintanencemasteraddComponent } from './maintanencemasteradd.component';

describe('MaintanencemasteraddComponent', () => {
  let component: MaintanencemasteraddComponent;
  let fixture: ComponentFixture<MaintanencemasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintanencemasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintanencemasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
