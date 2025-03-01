import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTextComponent } from './column-text.component';

describe('ColumnTextComponent', () => {
  let component: ColumnTextComponent<any>;
  let fixture: ComponentFixture<ColumnTextComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
