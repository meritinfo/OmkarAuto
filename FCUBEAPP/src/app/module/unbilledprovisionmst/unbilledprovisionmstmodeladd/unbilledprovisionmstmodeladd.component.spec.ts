import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbilledprovisionmstmodeladdComponent } from './unbilledprovisionmstmodeladd.component';

describe('UnbilledprovisionmstmodeladdComponent', () => {
  let component: UnbilledprovisionmstmodeladdComponent;
  let fixture: ComponentFixture<UnbilledprovisionmstmodeladdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbilledprovisionmstmodeladdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnbilledprovisionmstmodeladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
