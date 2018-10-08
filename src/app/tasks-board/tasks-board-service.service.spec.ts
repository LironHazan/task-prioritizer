import { TestBed, inject } from '@angular/core/testing';

import { TasksBoardServiceService } from './tasks-board-service.service';

describe('TasksBoardServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksBoardServiceService]
    });
  });

  it('should be created', inject([TasksBoardServiceService], (service: TasksBoardServiceService) => {
    const filteredTasks = service.filterTasksById([{id: 111, name: 'woo', description: 'fff'}], 111);
    expect(filteredTasks.length === 0).toBeTruthy();
  }));
});
