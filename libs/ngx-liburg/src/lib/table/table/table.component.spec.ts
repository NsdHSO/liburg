import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { DragDropModule } from "@angular/cdk/drag-drop";


describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatTableModule, DragDropModule
      ],
      declarations: [ TableComponent ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.dataSource = [ { model: {} as any } as any,
      { model: {} as any } as any ]
    component.zebraColor = true
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should zebra be in class list ', () => {
    const elementRow = fixture.nativeElement.querySelector('[ data-test="mat-row-def"]' )
    expect(elementRow.classList).toContain('zebra')
  })
  it('should not zebra be in class list ', () => {
    const elementRow = fixture.nativeElement.querySelector('[ data-test="mat-row-def"]' )
    component.zebraColor = false
    fixture.detectChanges()
    expect(elementRow.classList).not.toContain('zebra')
  })
});
