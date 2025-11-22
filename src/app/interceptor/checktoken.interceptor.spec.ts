import { TestBed } from '@angular/core/testing';

import { ChecktokenInterceptor } from './checktoken.interceptor';

describe('ChecktokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ChecktokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ChecktokenInterceptor = TestBed.inject(ChecktokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
