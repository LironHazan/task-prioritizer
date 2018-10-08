import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() notifyTaskRemoval = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  remove(event, task) {
    this.notifyTaskRemoval.emit(task);
  }

}
