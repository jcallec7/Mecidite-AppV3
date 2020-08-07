import { TestBed } from '@angular/core/testing';

import { DiagnosticoServiceService } from './diagnostico-service.service';

describe('DiagnosticoServiceService', () => {
  let service: DiagnosticoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
