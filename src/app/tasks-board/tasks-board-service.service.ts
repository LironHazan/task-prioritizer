import { Injectable } from '@angular/core';
import {Task} from './task/task.model';
import {map} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksBoardServiceService {

  constructor() { }

  public filterTasksById(tasks, id) {
    return tasks.filter(task => task.id !== id);
  }

  public rebuildTasks(actions) {
    return actions.map(action => {
      const data = action.payload.doc.data() as Task;
      const id = action.payload.doc.id;
      return { id, ...data };
    });
  }

  public existsOnDraggableGroup(group, task): boolean {
    return group.some(_item => _item.id === task.id);
  }

}
