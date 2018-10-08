import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksBoardComponent implements OnInit {

  //todo poc will be removed soon:

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

  constructor(private dragulaService: DragulaService) {
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
    //popup dialog
  }

}
