import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotempgcaddComponent } from './dotempgcadd.component';

describe('DotempgcaddComponent', () => {
  let component: DotempgcaddComponent;
  let fixture: ComponentFixture<DotempgcaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotempgcaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotempgcaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
