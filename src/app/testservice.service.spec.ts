/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JourneysService } from './journeys.service';

describe('JourneysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JourneysService]
    });
  });

  it('should ...', inject([JourneysService], (service: JourneysService) => {
    expect(service).toBeTruthy();
  }));
});
