import {Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {  faSignInAlt, faCookie, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {UserStoreService} from './user-store.service';
import {ThemeService} from './shared/them/theme.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container" *ngIf="afAuth.user | async as user; else showLogin">
      <span class="header" appTheme>
        <h2 class="greet">Hello {{ user.displayName }}!</h2>
        <div class="btns-flex-col">
          <a class="logout-link" (click)="logout()">Logout
            <fa-icon [icon]="faSignOutAlt"></fa-icon>
          </a>
          <a class="logout-link" (click)="toggleTheme()">Change Theme!
            <fa-icon [icon]="faCookie"></fa-icon>
          </a>
        </div>
      </span>
      <app-tasks-board></app-tasks-board>
    </div>
    <ng-template #showLogin>
      <section class="login" appTheme>
        <p>Please login to the most awesome tasks prioritizing application!</p>
        <button (click)="login()">Login with Google
          <fa-icon [icon]="faSign"></fa-icon>
        </button>
      </section>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth,
              private userStoreService: UserStoreService,
              private themService: ThemeService) {
  }
  user: string;
  faSign = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faCookie = faCookie;
  activeThem = 'oceanBlueThemProps';

  ngOnInit() {
    this.user = localStorage.getItem('user');
    if (this.user) this.userStoreService.setUserDetails({email: this.user});
  }

  login() {
    let email, id;
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        const { user, additionalUserInfo } = res;
        email = user.email;
        id = additionalUserInfo.profile['id'];
        try {
          localStorage.setItem('user', email);
        } catch (e) {
          console.log(e);
          this.user = null;
        }
        this.userStoreService.setUserDetails({email, id});
      })
      .catch(err => console.log(err));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
      }).catch(err => console.log(err));
  }

  toggleTheme() {
    // refactor this ugly code, let the user select the theme from a dd :) for demos only
    if (this.activeThem !== 'deepPurpleThemProps') {
      this.themService.notifyActiveThemeChange('deepPurpleThemProps');
      this.activeThem = 'deepPurpleThemProps';
    } else {
      this.themService.notifyActiveThemeChange('oceanBlueThemProps');
      this.activeThem = 'oceanBlueThemProps';
    }
  }

}

