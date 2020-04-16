import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DisciplinePart, Session } from "../../../classes/session";
import { DscApiService } from "../../../dsc-api.service";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  
  @Output()
  openPartModal = new EventEmitter<boolean>();
  

  private menuState = false;
  openMenu() {
    this.menuState = !this.menuState;
    this.openPartModal.emit(this.menuState);
  }
  
  onHover(state: boolean) {
    // this.openPartModal.emit(state);
  }

  


  private dscAPI: DscApiService;
  constructor(dscAPI: DscApiService) {
    this.dscAPI = dscAPI;
  }

  ngOnInit() {
  }

}
