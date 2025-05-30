import { TestBed } from '@angular/core/testing';

import { WordSetService } from './word-set.service';

describe('WordSetService', () => {
  let service: WordSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
