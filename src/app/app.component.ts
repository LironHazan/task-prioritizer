import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-poc" *ngIf="afAuth.user | async as user; else showLogin">
      <h1>Hello {{ user.displayName }}!</h1>
      <button (click)="logout()">Logout</button>
      <div class="flex">
        <div class="container" dragula="VAMPIRES" [(dragulaModel)]="vamps">
          <div class="vamp" *ngFor="let vamp of vamps">{{ vamp.name }}</div>
        </div>

        <div class="container" dragula="VAMPIRES" [(dragulaModel)]="vamps2">
          <div class="vamp" *ngFor="let vamp of vamps2">{{ vamp.name }}</div>
        </div>
      </div>

    </div>
    <ng-template #showLogin>
      <p>Please login.</p>
      <button (click)="login()">Login with Google</button>
    </ng-template>
  `,
})
export class AppComponent {
  //todo poc will be removed soon:
  vamps = [
    { name: "Bad Vamp" },
    { name: "Petrovitch the Slain" },
    { name: "Bob of the Everglades" },
    { name: "The Optimistic Reaper" }
  ];

  vamps2 = [
    { name: "Dracula" },
    { name: "Kurz" },
    { name: "Vladislav" },
    { name: "Deacon" }
  ];
  constructor(public afAuth: AngularFireAuth,
              private dragulaService: DragulaService) {
    this.dragulaService.createGroup("VAMPIRES", {
      // ...
    });

    this.dragulaService.dropModel("VAMPIRES").subscribe(args => {
      console.log(args);
    });
  }
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
