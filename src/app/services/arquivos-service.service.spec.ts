import { TestBed } from '@angular/core/testing';

import { ArquivosServiceService } from './arquivos-service.service';

describe('ArquivosServiceService', () => {
  let service: ArquivosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArquivosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
