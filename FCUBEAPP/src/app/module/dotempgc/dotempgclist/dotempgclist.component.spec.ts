import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotempgclistComponent } from './dotempgclist.component';

describe('DotempgclistComponent', () => {
  let component: DotempgclistComponent;
  let fixture: ComponentFixture<DotempgclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotempgclistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotempgclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
