import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  declarations: [ DialogComponent],
  exports:      [
    CommonModule, FormsModule],
  entryComponents: [DialogComponent]

})
export class SharedModule { }
