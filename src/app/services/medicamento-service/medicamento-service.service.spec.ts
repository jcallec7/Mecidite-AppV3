import { TestBed } from '@angular/core/testing';

import { MedicamentoServiceService } from './medicamento-service.service';

describe('MedicamentoServiceService', () => {
  let service: MedicamentoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicamentoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
