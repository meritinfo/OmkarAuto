import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankcashcontralistComponent } from './bankcashcontralist.component';

describe('BankcashcontralistComponent', () => {
  let component: BankcashcontralistComponent;
  let fixture: ComponentFixture<BankcashcontralistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankcashcontralistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankcashcontralistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
