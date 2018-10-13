import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserStoreService} from '../../user-store.service';
import {Subscription} from 'rxjs';
import {Areas} from '../task/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit, OnDestroy {
  public name: string;
  public description: string;
  public selectedArea: string;
  public areas: string[] = [Areas.importantNotUrgent,
    Areas.importantUrgent,
    Areas.urgentNotImportant,
    Areas.notImportantNotUrgent];
  public openedBy: string;
  private userSubscription: Subscription;
  private id: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<NewTaskComponent>,
              private userStoreService: UserStoreService) { }

  ngOnInit() {
    this.userSubscription = this.userStoreService.getUserDetails()
      .subscribe(user => {
        this.openedBy = user.email;
      });

    const {data} = this.data;
    if (data && data.task) {
      const {id, name, description, area} = data.task;
      this.id = id;
      this.name = name;
      this.description = description;
      this.selectedArea = area;
    } else {
      this.name = '';
      this.description = '';
      this.selectedArea = '';
    }
  }

  onSave() {
    const newItem = {name: this.name, description: this.description, area: this.selectedArea, openedBy: this.openedBy};
    if (this.id) {
      const editedItem = Object.assign(newItem, {id: this.id});
      this.dialogRef.close(editedItem);
      return;
    }
    this.dialogRef.close(newItem);
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
