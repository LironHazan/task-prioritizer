import { Injectable } from '@angular/core';
import {Task} from './task/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksBoardServiceService {

  constructor() { }

  public filterTasksById(tasks, id) {
    return tasks.filter(task => task.id !== id);
  }

}
