import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenbanklistaddComponent } from './benbanklistadd.component';

describe('BenbanklistaddComponent', () => {
  let component: BenbanklistaddComponent;
  let fixture: ComponentFixture<BenbanklistaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenbanklistaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenbanklistaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
