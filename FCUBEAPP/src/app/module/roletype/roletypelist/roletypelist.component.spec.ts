import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoletypelistComponent } from './roletypelist.component';

describe('RoletypelistComponent', () => {
  let component: RoletypelistComponent;
  let fixture: ComponentFixture<RoletypelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoletypelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoletypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
