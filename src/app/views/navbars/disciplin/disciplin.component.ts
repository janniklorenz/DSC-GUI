import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Discipline } from "../../../classes/session";
import { DscApiService } from "../../../dsc-api.service";

@Component({
  selector: 'app-disciplin',
  templateUrl: './disciplin.component.html',
  styleUrls: ['./disciplin.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('200ms', style({ height: '*', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: '*', opacity: 1 }),
            animate('200ms', style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
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
