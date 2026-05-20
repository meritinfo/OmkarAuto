import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartygroupmasterlistComponent } from './partygroupmasterlist.component';

describe('PartygroupmasterlistComponent', () => {
  let component: PartygroupmasterlistComponent;
  let fixture: ComponentFixture<PartygroupmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartygroupmasterlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartygroupmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
