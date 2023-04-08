import { TestBed } from '@angular/core/testing';

import { GrdGuard } from './grd.guard';

describe('GrdGuard', () => {
  let guard: GrdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GrdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
