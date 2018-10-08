import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ComponentType} from '@angular/cdk/typings/portal';
import {DialogComponent} from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) { }

  private conf = { autoFocus: true };

  private mediumConf = {height: 'auto', width: '70%', ...this.conf};

  public open<T>(component: ComponentType<T> | TemplateRef<T>, data: any) {
    this.mediumConf['data'] = { component, data };
    const conf = this.mediumConf;
    return this.dialog.open(DialogComponent, conf);
  }

  // Alert dialog component will replace the MyDialogComponent
  public error<T>( error: any) {
    return this.dialog.open(DialogComponent, {data: error, panelClass: 'alert-panel'});
  }
}

