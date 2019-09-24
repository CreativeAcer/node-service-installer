import { TestBed } from '@angular/core/testing';

import { WindowsServiceService } from './windows-service.service';

describe('WindowsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowsServiceService = TestBed.get(WindowsServiceService);
    expect(service).toBeTruthy();
  });
});
