import { TestBed } from '@angular/core/testing';

import { WindowsDaysOffService } from '../Services/windows-days-off.service';

describe('WindowsDaysOffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowsDaysOffService = TestBed.get(WindowsDaysOffService);
    expect(service).toBeTruthy();
  });
});
