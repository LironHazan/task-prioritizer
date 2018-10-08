import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ DialogComponent],
  exports:      [
    CommonModule, FormsModule]
})
export class SharedModule { }
