import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcnorcneemasterComponent } from './listcnorcneemaster.component';

describe('ListcnorcneemasterComponent', () => {
  let component: ListcnorcneemasterComponent;
  let fixture: ComponentFixture<ListcnorcneemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcnorcneemasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcnorcneemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
