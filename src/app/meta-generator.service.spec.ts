import { TestBed } from '@angular/core/testing';

import { MetaGeneratorService } from './meta-generator.service';

describe('MetaGeneratorService', () => {
  let service: MetaGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
