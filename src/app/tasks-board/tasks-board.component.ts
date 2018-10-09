import {Component, OnDestroy, OnInit} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {Areas, Task} from './task/task.model';
import {DialogService} from '../shared/dialog/dialog.service';
import {NewTaskComponent} from './new-task/new-task.component';
import {Observable, Subscription} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {TasksBoardServiceService} from './tasks-board-service.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {map} from 'rxjs/operators';
import {UserStoreService} from '../user-store.service';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.scss'],
})
export class TasksBoardComponent implements OnInit, OnDestroy {
  tasksCollectionRef: AngularFirestoreCollection <Task>;
  private tasksSubscription: Subscription;
  public faPlusCircle = faPlusCircle;
  public tasksAreas = Areas;
  private dialogServiceSubscription: Subscription;
  private dragulaServiceSubscription: Subscription;
  private areaList = [Areas.importantNotUrgent,
    Areas.importantUrgent,
    Areas.urgentNotImportant,
    Areas.notImportantNotUrgent];
  private tasks: Task[];
  public importantNotUrgent: Task[] = [];
  public importantUrgent: Task[] = [];
  public urgentNotImportant: Task[] = [];
  public notImportantNotUrgent: Task[] = [];
  public user$: Observable<any>;

  constructor(private dragulaService: DragulaService,
              private dialogService: DialogService,
              private tasksBoardServiceService: TasksBoardServiceService,
              private afs: AngularFirestore) {
    this.dragulaService.createGroup('TASKS', {});
    this.dragulaServiceSubscription = this.dragulaService.dropModel('TASKS')
      .subscribe(args => {
      this.updateTasksAreaOnDrag(args);
    });
  }

  ngOnInit() {
     this.tasksCollectionRef = this.afs.collection<Task>('tasks');
     this.tasksSubscription = this.tasksCollectionRef.snapshotChanges()
      .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Task;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    })).subscribe(tasks => {
      this.tasks = tasks;
      if (tasks.length > 0 ) {
        this.initViewGroups(tasks);
      }
    });
  }

  initViewGroups(tasks) {
    for (const task of tasks) {
      this.addItemToDraggableGroup(task);
    }
  }
  removeTask(task) {
    this.removeItemFromDraggableGroup(task);
    this.tasksCollectionRef.doc(task.id).delete();
  }

  editTask(task) {
    this.dialogServiceSubscription = this.dialogService.open(NewTaskComponent, {areas: this.areaList, task})
      .afterClosed().subscribe(taskToEdit => {
        this.tasksCollectionRef.doc(taskToEdit.id).update(taskToEdit);
        this.removeItemFromDraggableGroup(task);
      });
  }

  addNewTask(event) {
    this.dialogServiceSubscription = this.dialogService.open(NewTaskComponent, this.areaList)
      .afterClosed().subscribe(newTask => {
        this.tasksCollectionRef.add(newTask);
      });
  }

  private addItemToDraggableGroup(newTask) {
    if (!newTask.area) return;
    let task;
    switch (newTask.area.trim()) {
      case (Areas.importantNotUrgent.trim()):
        task = this.importantNotUrgent.find(_item => _item.id === newTask.id);
        if (!task ) this.importantNotUrgent.push(newTask);
        break;
      case (Areas.urgentNotImportant.trim()):
        task = this.urgentNotImportant.find(_item => _item.id === newTask.id);
        if (!task) this.urgentNotImportant.push(newTask);
        break;
      case (Areas.notImportantNotUrgent.trim()):
        task = this.notImportantNotUrgent.find(_item => _item.id === newTask.id);
        if (!task) this.notImportantNotUrgent.push(newTask);
        break;
      case (Areas.importantUrgent.trim()):
        task = this.importantUrgent.find(_item => _item.id === newTask.id);
        if (!task) this.importantUrgent.push(newTask);
        break;
    }
  }

  private removeItemFromDraggableGroup(task) {
    switch (task.area.trim()) {
      case (Areas.importantNotUrgent.trim()):
        this.importantNotUrgent = this.importantNotUrgent.filter(_task => _task.id !== task.id);
        break;
      case (Areas.urgentNotImportant.trim()):
        this.urgentNotImportant = this.urgentNotImportant.filter(_task => _task.id !== task.id);
        break;
      case (Areas.notImportantNotUrgent.trim()):
        this.notImportantNotUrgent = this.notImportantNotUrgent.filter(_task => _task.id !== task.id);
        break;
      case (Areas.importantUrgent.trim()):
        this.importantUrgent = this.importantUrgent.filter(_task => _task.id !== task.id);
        break;
    }
  }

  private updateTasksAreaOnDrag(eventArgs) {
    eventArgs.item.area = eventArgs.source.id;
    this.removeItemFromDraggableGroup(eventArgs.item);

    eventArgs.item.area = eventArgs.target.id;
    // targe.id is actually the dom id attribute value
    this.tasksCollectionRef.doc(eventArgs.item.id).update(eventArgs.item);
  }

  ngOnDestroy() {
    if (this.dialogServiceSubscription) {
      this.dialogServiceSubscription.unsubscribe();
    }
    this.dragulaService.destroy('TASKS');
    if (this.dragulaServiceSubscription) {
      this.dragulaServiceSubscription.unsubscribe();
    }
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }
}
