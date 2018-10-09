import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private user = new BehaviorSubject({email: ''});

  constructor() {
  }

  public getUserDetails() {
    return this.user.asObservable();
  }

  public setUserDetails(userDetails) {
    this.user.next(userDetails);
  }

}
