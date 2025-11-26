import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbilledprovisionmstaddComponent } from './unbilledprovisionmstadd.component';

describe('UnbilledprovisionmstaddComponent', () => {
  let component: UnbilledprovisionmstaddComponent;
  let fixture: ComponentFixture<UnbilledprovisionmstaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbilledprovisionmstaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnbilledprovisionmstaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
