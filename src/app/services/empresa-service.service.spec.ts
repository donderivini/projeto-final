import { TestBed } from '@angular/core/testing';

import { EmpresaServiceService } from './empresa-service.service';

describe('EmpresaServiceService', () => {
  let service: EmpresaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
