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
  private id: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<NewTaskComponent>) { }

  ngOnInit() {
    // todo: temp  will be removed when adding server side

    this.id = new Date().getTime();
    this.name = '';
    this.description = '';
    this.selectedArea = '';
  }

  onSave() {
    this.dialogRef.close({
      id: this.id, name: this.name, description: this.description, area: this.selectedArea
    });
  }
}
