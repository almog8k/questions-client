import { TestBed } from '@angular/core/testing';

import { QuestionApiService } from './question-api.service';

describe('QuestionService', () => {
  let service: QuestionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
