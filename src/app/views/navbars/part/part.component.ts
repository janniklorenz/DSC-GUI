import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DisciplinePart, Session } from "../../../classes/session";
import { DscApiService } from "../../../dsc-api.service";

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  
  @Output()
  openPartModal = new EventEmitter<boolean>();
  
  onClickPart() {
    // this.openPartModal.emit();
  }
  
  onHover(state: boolean) {
    this.openPartModal.emit(state);
  }

  disciplineParts: DisciplinePart[];
  private _session: Session;
  @Input()
  set session(session: Session) {
    this._session = session;
    this.disciplineParts = session.discipline.parts;
    session.discipline.parts.forEach(dPart => {
      let active_part = session.active_part;
      let part = session.parts[active_part];
      if (dPart.id == part.part_type) {
        this.disciplinePart = dPart;
        return;
      }
    });
  }
  disciplinePart: DisciplinePart;
  
  getDisciplinePart(type: String): DisciplinePart {
    return this._session.discipline.parts.find(part => part.id == type);
  }
  
  selectPart(partId: number) {
    
  }
  
  
  
  togglePart() {
    const disciplineParts = this._session.discipline.parts;
    const activePart = this._session.parts[this._session.active_part];
    const activeDisciplineParts = this.getDisciplinePart(activePart.part_type);
    const currentIndex = disciplineParts.indexOf(activeDisciplineParts);
    
    // Jump to the first disciplin part if we are at the end
    if (currentIndex + 1 >= disciplineParts.length) {
      this.dscAPI.setPart(disciplineParts[0].id, false);
    }
    // Jump to the nex disciplin part
    else {
      this.dscAPI.setPart(disciplineParts[currentIndex+1].id, false);
    }
  }
  


  private dscAPI: DscApiService;
  constructor(dscAPI: DscApiService) {
    this.dscAPI = dscAPI;
  }

  ngOnInit() {
  }

}
