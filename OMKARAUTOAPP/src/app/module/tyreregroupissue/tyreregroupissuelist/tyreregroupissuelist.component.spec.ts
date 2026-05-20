import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreregroupissuelistComponent } from './tyreregroupissuelist.component';

describe('TyreregroupissuelistComponent', () => {
  let component: TyreregroupissuelistComponent;
  let fixture: ComponentFixture<TyreregroupissuelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreregroupissuelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyreregroupissuelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
