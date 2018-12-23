import { TestBed, inject } from '@angular/core/testing';

import { FeedbackServiceService } from './feedback-service.service';

describe('FeedbackServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackServiceService]
    });
  });

  it('should be created', inject([FeedbackServiceService], (service: FeedbackServiceService) => {
    expect(service).toBeTruthy();
  }));
});
