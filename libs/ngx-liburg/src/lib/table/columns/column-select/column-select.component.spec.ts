import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSelectComponent } from './column-select.component';

describe('ColumnSelectComponent', () => {
  let component: ColumnSelectComponent<any>;
  let fixture: ComponentFixture<ColumnSelectComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
