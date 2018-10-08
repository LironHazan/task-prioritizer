import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  public name: string;
  public description: string;
  public selectedArea: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<NewTaskComponent>) { }

  ngOnInit() {
    this.name = '';
    this.description = '';
    this.selectedArea = '';
  }

  onSave() {
    this.dialogRef.close({
      name: this.name, description: this.description, area: this.selectedArea
    });
  }
}
