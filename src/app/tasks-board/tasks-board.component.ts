import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {Areas} from './task/task.model';
import {DialogService} from '../shared/dialog/dialog.service';
import {NewTaskComponent} from './new-task/new-task.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksBoardComponent implements OnInit {
  public tasksAreas = Areas;
  dialogServiceSubscription: Subscription;
  private areaList = [Areas.importantNotUrgent,
    Areas.importantUrgent,
    Areas.urgentNotImportant,
    Areas.notImportantNotUrgent];

  //todo poc will be removed soon:
  //todo:
  // 4 collections for each state
  // when dragging and dropping should handle addition and removal accordigly

  vamps = [
    { name: "Bad Vamp", description: 'heythere'},
    { name: "Petrovitch the Slain", description: 'heythere'},
    { name: "Bob of the Everglades", description: 'heythere' },
    { name: "The Optimistic Reaper", description: 'heythere' }
  ];

  vamps2 = [
    { name: "Dracula" },
    { name: "Kurz" },
    { name: "Vladislav" },
    { name: "Deacon" }
  ];

  vamps3 = [
    { name: "Dracula" },
    { name: "Kurz" },
    { name: "Vladislav" },
    { name: "Deacon" }
  ];

  vamps4 = [
    { name: "Dracula" },
    { name: "Kurz" },
    { name: "Vladislav" },
    { name: "Deacon" }
  ];

  constructor(private dragulaService: DragulaService,
              private dialogService: DialogService) {
    this.dragulaService.createGroup("VAMPIRES", {
      // ...
    });

    this.dragulaService.dropModel("VAMPIRES").subscribe(args => {
      console.log(args);
    });
  }

  ngOnInit() {
  }

  addNewTask(event) {
    this.dialogServiceSubscription = this.dialogService.open(NewTaskComponent, this.areaList)
      .afterClosed().subscribe(restut => console.log(restut));
  }

}
