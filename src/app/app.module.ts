import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula';
import {FormsModule} from '@angular/forms';
import { TasksBoardComponent } from './tasks-board/tasks-board.component';
import { TaskComponent } from './tasks-board/task/task.component';
import { SharedModule } from './shared/shared.module';
import { NewTaskComponent } from './tasks-board/new-task/new-task.component';
import { MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    TasksBoardComponent,
    TaskComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    DragulaModule.forRoot(),
  ],
  providers: [],
  entryComponents: [NewTaskComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
