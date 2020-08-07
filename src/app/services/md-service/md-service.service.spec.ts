import { TestBed } from '@angular/core/testing';

import { MdServiceService } from './md-service.service';

describe('MdServiceService', () => {
  let service: MdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
