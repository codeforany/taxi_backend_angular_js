import { TestBed } from '@angular/core/testing';

import { MainSocketService } from './main-socket.service';

describe('MainSocketService', () => {
  let service: MainSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
