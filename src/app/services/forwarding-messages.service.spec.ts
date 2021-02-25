import { TestBed } from '@angular/core/testing';

import { ForwardingMessagesService } from './forwarding-messages.service';

describe('ForwardingMessagesService', () => {
  let service: ForwardingMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForwardingMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
