import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChcosttypesaddComponent } from './chcosttypesadd.component';

describe('ChcosttypesaddComponent', () => {
  let component: ChcosttypesaddComponent;
  let fixture: ComponentFixture<ChcosttypesaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChcosttypesaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChcosttypesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
