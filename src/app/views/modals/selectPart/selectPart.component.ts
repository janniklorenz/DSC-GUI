import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Session, Serie, Target } from "../../../classes/session";

@Component({
  selector: 'app-select-part-modal',
  templateUrl: './selectPart.component.html',
  styleUrls: ['./selectPart.component.scss']
})
export class SelectPartModalComponent {
  
  // @Input()
  // private series: Serie;
  // 
  // @Input()
  // selectedShotIndex: number;
  // 
  // @Output()
  // onChangeSelection = new EventEmitter<number>();
  
  // selectShot(index: number) {
  //   this.onChangeSelection.emit(index);
  // }
  
  constructor() { }
}
