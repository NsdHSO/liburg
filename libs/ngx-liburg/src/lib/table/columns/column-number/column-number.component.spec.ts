import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnNumberComponent } from './column-number.component';

describe('ColumnNumberComponent', () => {
  let component: ColumnNumberComponent<any>;
  let fixture: ComponentFixture<ColumnNumberComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnNumberComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
