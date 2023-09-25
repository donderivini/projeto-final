import { TestBed } from '@angular/core/testing';

import { FrotasServiceService } from './frotas-service.service';

describe('FrotasServiceService', () => {
  let service: FrotasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrotasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
