import { TestBed } from '@angular/core/testing';

import { ConductQuizService } from './conduct-quiz.service';

describe('ConductQuizService', () => {
  let service: ConductQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
