import { TestBed, inject } from '@angular/core/testing';

import { HereService } from './here.service';

describe('HereService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HereService]
    });
  });

  it('should be created', inject([HereService], (service: HereService) => {
    expect(service).toBeTruthy();
  }));
});
