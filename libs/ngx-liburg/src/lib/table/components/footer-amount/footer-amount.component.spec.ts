import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAmountComponent } from './footer-amount.component';

describe('FooterAmountComponent', () => {
  let component: FooterAmountComponent;
  let fixture: ComponentFixture<FooterAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
