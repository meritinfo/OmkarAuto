import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanwisetdsrateaddComponent } from './panwisetdsrateadd.component';

describe('PanwisetdsrateaddComponent', () => {
  let component: PanwisetdsrateaddComponent;
  let fixture: ComponentFixture<PanwisetdsrateaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanwisetdsrateaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanwisetdsrateaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
