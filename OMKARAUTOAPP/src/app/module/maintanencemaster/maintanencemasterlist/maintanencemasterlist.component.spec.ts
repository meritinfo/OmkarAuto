import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintanencemasterlistComponent } from './maintanencemasterlist.component';

describe('MaintanencemasterlistComponent', () => {
  let component: MaintanencemasterlistComponent;
  let fixture: ComponentFixture<MaintanencemasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintanencemasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintanencemasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
