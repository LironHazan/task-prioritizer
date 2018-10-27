import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ThemeDirective} from './them/theme.directive';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [
    DialogComponent,
    ThemeDirective],
  exports:      [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ThemeDirective
  ],
  entryComponents: [DialogComponent]

})
export class SharedModule { }
