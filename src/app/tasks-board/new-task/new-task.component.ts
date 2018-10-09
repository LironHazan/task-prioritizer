import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserStoreService} from '../../user-store.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  public name: string;
  public description: string;
  public selectedArea: string;
  public areas: string[];
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
    this.areas = data.areas || data;
    const taskToEdit = data.task;
    if (taskToEdit) {
      this.id = taskToEdit.id;
      this.name = taskToEdit.name;
      this.description = taskToEdit.description;
      this.selectedArea = taskToEdit.area;
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
}
