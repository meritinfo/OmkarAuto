import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanwisetdsratelistComponent } from './panwisetdsratelist.component';

describe('PanwisetdsratelistComponent', () => {
  let component: PanwisetdsratelistComponent;
  let fixture: ComponentFixture<PanwisetdsratelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanwisetdsratelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanwisetdsratelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
