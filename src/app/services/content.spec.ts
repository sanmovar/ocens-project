import { TestBed } from '@angular/core/testing';

import { Content } from './content';

describe('Content', () => {
  let service: Content;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Content);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
