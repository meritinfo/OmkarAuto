import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbilledprovisionmstmodellistComponent } from './unbilledprovisionmstmodellist.component';

describe('UnbilledprovisionmstmodellistComponent', () => {
  let component: UnbilledprovisionmstmodellistComponent;
  let fixture: ComponentFixture<UnbilledprovisionmstmodellistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbilledprovisionmstmodellistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnbilledprovisionmstmodellistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
