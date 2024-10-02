import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartygroupmasteraddComponent } from './partygroupmasteradd.component';

describe('PartygroupmasteraddComponent', () => {
  let component: PartygroupmasteraddComponent;
  let fixture: ComponentFixture<PartygroupmasteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartygroupmasteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartygroupmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
