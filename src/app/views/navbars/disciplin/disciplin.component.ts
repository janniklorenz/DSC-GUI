import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Discipline } from "../../../classes/session";
import { DscApiService } from "../../../dsc-api.service";

@Component({
  selector: 'app-disciplin',
  templateUrl: './disciplin.component.html',
  styleUrls: ['./disciplin.component.scss']
})
export class DisciplinComponent implements OnInit {

  @Input() discipline: Discipline;
  
  private menuTitle = "disciplin";
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
  
  setDiscipline(disciplin: string) {
    this.dscAPI.setDisciplin(disciplin);
  }

  private dscAPI: DscApiService;
  constructor(dscAPI: DscApiService) {
    this.dscAPI = dscAPI;
  }

  ngOnInit() {
  }

  openModal() {
    // show_modal_discipline
  }

}
