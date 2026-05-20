import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotempgceditComponent } from './dotempgcedit.component';

describe('DotempgceditComponent', () => {
  let component: DotempgceditComponent;
  let fixture: ComponentFixture<DotempgceditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotempgceditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotempgceditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
