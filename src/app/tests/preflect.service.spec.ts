import { TestBed } from '@angular/core/testing';

import { PreflectService } from '../Services/preflect.service';

describe('PreflectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreflectService = TestBed.get(PreflectService);
    expect(service).toBeTruthy();
  });
});
