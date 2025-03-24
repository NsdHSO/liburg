import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnAreaTextComponent } from './column-area-text.component';
import { overlay } from "../mock/mock";

describe('ColumnAreaTextComponent', () => {
  let component: ColumnAreaTextComponent;
  let fixture: ComponentFixture<ColumnAreaTextComponent>;
  let overlayService: jasmine.SpyObj<Overlay>
  beforeEach(async () => {
    overlayService = jasmine.createSpyObj(
      'Overlay',
      overlay()
    )
    await TestBed.configureTestingModule({
      declarations: [ ColumnAreaTextComponent ],
      providers: [
        {
          provide: Overlay,
          useValue: overlayService
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnAreaTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
