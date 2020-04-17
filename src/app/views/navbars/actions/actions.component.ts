import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DisciplinePart, Session } from "../../../classes/session";
import { DscApiService } from "../../../dsc-api.service";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  
  private menuTitle = "actions";
  @Output() openMenuChange = new EventEmitter();
  private _openMenu = false;
  @Input() set openMenu(event) {
    if ((event.menuTitle != this.menuTitle && event.state == true) || event.triggerClose == true) {
      this._openMenu = false;
    }
  }
  toggleMenu() {
    this._openMenu = !this._openMenu;
    this.openMenuChange.emit({
      state: this._openMenu,
      menuTitle: this.menuTitle,
      triggerClose: false,
    });
  }
  


  private dscAPI: DscApiService;
  constructor(dscAPI: DscApiService) {
    this.dscAPI = dscAPI;
  }

  ngOnInit() {
  }

}
