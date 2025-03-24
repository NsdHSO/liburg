import { TestBed } from "@angular/core/testing";
import { ElixTooltipService } from "./elix-tooltip.service";
import { Overlay } from "@angular/cdk/overlay";
import { overlay } from "../mock/mock";

describe('ElixTooltipService', () => {
  let service: ElixTooltipService;
  let overlayService: jasmine.SpyObj<Overlay>
  beforeEach(() => {
    overlayService = jasmine.createSpyObj(
      'Overlay',
      overlayService = jasmine.createSpyObj(
        'Overlay',
        overlay()
      ))
    TestBed.configureTestingModule({
      providers: [
        ElixTooltipService,
        {
          provide: Overlay, useValue: overlayService
        }
      ]
    });
    service = TestBed.inject(ElixTooltipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
