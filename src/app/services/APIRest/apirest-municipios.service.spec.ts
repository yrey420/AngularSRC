import { TestBed } from '@angular/core/testing';

import { APIRestMunicipiosService } from './apirest-municipios.service';

describe('APIRestMunicipiosService', () => {
  let service: APIRestMunicipiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIRestMunicipiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
