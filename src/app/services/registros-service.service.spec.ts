import { TestBed } from '@angular/core/testing';

import { RegistrosServiceService } from './registros-service.service';

describe('RegistrosServiceService', () => {
  let service: RegistrosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
