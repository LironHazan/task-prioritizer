import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserStoreService} from '../../user-store.service';
import {Subscription} from 'rxjs';
import {Areas, Task} from '../task/task.model';
import {areas} from '../tasks.const';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  public areas = areas;
  public task: Task = {
    name: null,
    area: Areas.importantNotUrgent,
    description: null,
    areaType: null,
    openedBy: null,
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<NewTaskComponent>,
              private userStoreService: UserStoreService) { }

  ngOnInit() {
    this.userSubscription = this.userStoreService.getUserDetails()
      .subscribe(user => {
        this.task.openedBy = user.email;
      });

    const {data} = this.data;
    if (data && data.task) this.task = {...data.task};
  }

  onSave() {
    let task = this.task;
    task.areaType = areas.find(area => area.value === task.area).id;
    if (this.task.id) {
      task = Object.assign(task, {id: this.task.id});
    }
    this.dialogRef.close(task);
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
