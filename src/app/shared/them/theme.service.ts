import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeThem = new BehaviorSubject('oceanBlueThemProps');

  constructor() { }

  public observeActiveThemeChane() {
    return this.activeThem.asObservable();
  }

  public notifyActiveThemeChange(name) {
    this.activeThem.next(name);
  }
}
