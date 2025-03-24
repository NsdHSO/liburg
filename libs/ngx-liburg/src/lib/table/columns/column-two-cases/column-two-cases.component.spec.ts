import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTwoCasesComponent } from './column-two-cases.component';

describe('ColumnTwoCasesComponent', () => {
  let component: ColumnTwoCasesComponent<any>;
  let fixture: ComponentFixture<ColumnTwoCasesComponent<any>>;

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
