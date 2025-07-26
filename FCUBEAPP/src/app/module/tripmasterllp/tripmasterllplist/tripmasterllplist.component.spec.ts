import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripmasterllplistComponent } from './tripmasterllplist.component';

describe('TripmasterllplistComponent', () => {
  let component: TripmasterllplistComponent;
  let fixture: ComponentFixture<TripmasterllplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripmasterllplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripmasterllplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
