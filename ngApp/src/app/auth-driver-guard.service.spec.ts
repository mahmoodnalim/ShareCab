import { TestBed, inject } from '@angular/core/testing';

import { AuthDriverGuardService } from './auth-driver-guard.service';

describe('AuthDriverGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDriverGuardService]
    });
  });

  it('should be created', inject([AuthDriverGuardService], (service: AuthDriverGuardService) => {
    expect(service).toBeTruthy();
  }));
});
