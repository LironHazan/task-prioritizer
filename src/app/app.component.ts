import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {  faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import {  faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {UserStoreService} from './user-store.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container" *ngIf="afAuth.user | async as user; else showLogin">
      <span>
        <h2>Hello {{ user.displayName }}!</h2>
        <button (click)="logout()">Logout
          <fa-icon [icon]="faSign"></fa-icon>
        </button>
      </span>
      <app-tasks-board></app-tasks-board>
    </div>
    <ng-template #showLogin>
      <section class="login">
        <p>Please login to the most awesome task prioritizing application!</p>
        <button (click)="login()">Login with Google
          <fa-icon [icon]="faSign"></fa-icon>
        </button>
      </section>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public afAuth: AngularFireAuth,
              private userStoreService: UserStoreService) {
  }
  faSign = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  login() {
    let email;
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        const { user } = res;
        email = user.email;
        this.userStoreService.setUserDetails({email});
      })
      .catch(err => console.log(err));
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
