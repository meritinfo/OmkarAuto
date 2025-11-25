import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbilledprovisionmstlistComponent } from './unbilledprovisionmstlist.component';

describe('UnbilledprovisionmstlistComponent', () => {
  let component: UnbilledprovisionmstlistComponent;
  let fixture: ComponentFixture<UnbilledprovisionmstlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbilledprovisionmstlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnbilledprovisionmstlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
