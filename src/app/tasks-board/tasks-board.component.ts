import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {Areas, Task} from './task/task.model';
import {DialogService} from '../shared/dialog/dialog.service';
import {NewTaskComponent} from './new-task/new-task.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.scss'],
})
export class TasksBoardComponent implements OnInit {
  public tasksAreas = Areas;
  dialogServiceSubscription: Subscription;
  private areaList = [Areas.importantNotUrgent,
    Areas.importantUrgent,
    Areas.urgentNotImportant,
    Areas.notImportantNotUrgent];
  private tasks: Task[];

  //todo:
  // 4 collections for each state
  // when dragging and dropping should handle addition and removal accordigly

  public importantNotUrgent: Task[] = [];
  public importantUrgent: Task[] = [];
  public urgentNotImportant: Task[] = [];
  public notImportantNotUrgent: Task[] = [];

  constructor(private dragulaService: DragulaService,
              private dialogService: DialogService) {
    this.dragulaService.createGroup("TASKS", {});
    this.dragulaService.dropModel("TASKS").subscribe(args => {

      this.tasks = this.updateTasksAreaOnDrag(args);
      console.log(this.tasks);
      // call firebase service and update
    });
  }

  ngOnInit() {
    //todo: fetch collections and init store service
    this.tasks = [];
  }

  removeTask(task) {
    this.tasks = this.tasks.filter(_task => _task.id !== task.id);
    this.removeItemFromDraggableGroup(task);
  }

  addNewTask(event) {
    this.dialogServiceSubscription = this.dialogService.open(NewTaskComponent, this.areaList)
      .afterClosed().subscribe(newTask => {
        this.tasks.push(newTask);
        this.addItemToDraggableGroup(newTask);
      });
  }

  private addItemToDraggableGroup(newTask) {
    switch (newTask.area) {
      case (Areas.importantNotUrgent):
        this.importantNotUrgent = [...this.importantNotUrgent, newTask];
        break;
      case (Areas.urgentNotImportant):
        this.urgentNotImportant = [...this.urgentNotImportant, newTask];
        break;
      case (Areas.notImportantNotUrgent):
        this.notImportantNotUrgent = [...this.notImportantNotUrgent, newTask];
        break;
      case (Areas.importantUrgent):
        this.importantUrgent = [...this.importantUrgent, newTask];
        break;
    }
  }

  private removeItemFromDraggableGroup(task) {
    switch (task.area) {
      case (Areas.importantNotUrgent):
        this.importantNotUrgent = this.importantNotUrgent.filter(_task => _task.id !== task.id);
        break;
      case (Areas.urgentNotImportant):
        this.urgentNotImportant = this.urgentNotImportant.filter(_task => _task.id !== task.id);
        break;
      case (Areas.notImportantNotUrgent):
        this.notImportantNotUrgent = this.notImportantNotUrgent.filter(_task => _task.id !== task.id);
        break;
      case (Areas.importantUrgent):
        this.importantUrgent = this.importantUrgent.filter(_task => _task.id !== task.id);
        break;
    }
  }

  private updateTasksAreaOnDrag(eventArgs) {
    const tasks = this.tasks.filter(task => task.id !== eventArgs.item.id);
    eventArgs.item.area = eventArgs.target.id;
    tasks.push(eventArgs.item);
    return tasks;
  }
}
