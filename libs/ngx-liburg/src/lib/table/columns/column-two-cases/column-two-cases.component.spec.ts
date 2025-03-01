import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTwoCasesComponent } from './column-two-cases.component';

describe('ColumnTwoCasesComponent', () => {
  let component: ColumnTwoCasesComponent;
  let fixture: ComponentFixture<ColumnTwoCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnTwoCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnTwoCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
