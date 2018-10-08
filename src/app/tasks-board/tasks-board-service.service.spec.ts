import { TestBed, inject } from '@angular/core/testing';

import { TasksBoardServiceService } from './tasks-board-service.service';

describe('TasksBoardServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksBoardServiceService]
    });
  });

  it('should be created', inject([TasksBoardServiceService], (service: TasksBoardServiceService) => {
    expect(service).toBeTruthy();
  }));
});
