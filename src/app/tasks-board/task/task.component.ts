import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task } from './task.model';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() notifyTaskRemoval = new EventEmitter();
  @Output() notifyEdit = new EventEmitter();
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;

  constructor() { }

  ngOnInit() {
  }

  remove(event, task: Task) {
    this.notifyTaskRemoval.emit(task);
  }

  edit(event, task: Task) {
    this.notifyEdit.emit(task);
  }

}
