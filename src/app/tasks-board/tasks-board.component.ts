import {Component, OnDestroy, OnInit} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {Areas, AreaType, Task} from './task/task.model';
import {DialogService} from '../shared/dialog/dialog.service';
import {NewTaskComponent} from './new-task/new-task.component';
import {Subscription} from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {TasksBoardServiceService} from './tasks-board-service.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {map} from 'rxjs/operators';
import {areas} from './tasks.const';

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
  public taskAreaType = AreaType;
  private dialogServiceSubscription: Subscription;
  private dragulaServiceSubscription: Subscription;
  private tasks: Task[];
  public importantNotUrgent: Task[] = [];
  public importantUrgent: Task[] = [];
  public urgentNotImportant: Task[] = [];
  public notImportantNotUrgent: Task[] = [];

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
      .pipe(map(actions => this.tasksBoardServiceService.rebuildTasks(actions)))
      .subscribe(tasks => {
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
    this.dialogServiceSubscription = this.dialogService.open(NewTaskComponent, {task})
      .afterClosed().subscribe(taskToEdit => {
        if (taskToEdit) {
          this.tasksCollectionRef.doc(taskToEdit.id).update(taskToEdit);
          this.removeItemFromDraggableGroup(task);
        }
      });
  }

  addNewTask(event) {
    this.dialogServiceSubscription = this.dialogService.open(NewTaskComponent, null)
      .afterClosed().subscribe(newTask => {
        this.tasksCollectionRef.add(newTask);
      });
  }

  private addItemToDraggableGroup(taskItem) {
    let task;
    switch (taskItem.areaType) {
      case (AreaType.importantNotUrgent):
        task = this.tasksBoardServiceService.existsOnDraggableGroup(this.importantNotUrgent, taskItem);
        if (!task ) this.importantNotUrgent = [...this.importantNotUrgent, taskItem];
        break;
      case (AreaType.urgentNotImportant):
        task = this.tasksBoardServiceService.existsOnDraggableGroup(this.urgentNotImportant, taskItem);
        if (!task) this.urgentNotImportant = [...this.urgentNotImportant, taskItem];
        break;
      case (AreaType.notImportantNotUrgent):
        task = this.tasksBoardServiceService.existsOnDraggableGroup(this.notImportantNotUrgent, taskItem);
        if (!task) this.notImportantNotUrgent = [...this.notImportantNotUrgent, taskItem];
        break;
      case (AreaType.importantUrgent):
        task = this.tasksBoardServiceService.existsOnDraggableGroup(this.importantUrgent, taskItem);
        if (!task) this.importantUrgent = [...this.importantUrgent, taskItem];
        break;
    }
  }

  private removeItemFromDraggableGroup(taskItem) {
    switch (taskItem.areaType) {
      case (AreaType.importantNotUrgent):
        this.importantNotUrgent = this.importantNotUrgent.filter(_task => _task.id !== taskItem.id);
        break;
      case (AreaType.urgentNotImportant):
        this.urgentNotImportant = this.urgentNotImportant.filter(_task => _task.id !== taskItem.id);
        break;
      case (AreaType.notImportantNotUrgent):
        this.notImportantNotUrgent = this.notImportantNotUrgent.filter(_task => _task.id !== taskItem.id);
        break;
      case (AreaType.importantUrgent):
        this.importantUrgent = this.importantUrgent.filter(_task => _task.id !== taskItem.id);
        break;
    }
  }

  private updateTasksAreaOnDrag(eventArgs) {
    eventArgs.item.areaType = +eventArgs.source.id;
    this.removeItemFromDraggableGroup(eventArgs.item);

    eventArgs.item.areaType = +eventArgs.target.id;
    eventArgs.item.area = areas.find(area => area.id == eventArgs.target.id).value;
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
