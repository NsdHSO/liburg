import { TestBed } from '@angular/core/testing';

import { ColumnRotateService } from './column-rotate.service';

describe('ColumnRotateService', () => {
  let service: ColumnRotateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnRotateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
