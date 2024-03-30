import { TestBed } from '@angular/core/testing';

import { RegiterserviceService } from './regiterservice.service';

describe('RegiterserviceService', () => {
  let service: RegiterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegiterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
