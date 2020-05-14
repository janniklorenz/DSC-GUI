import { Component, OnInit, Input } from '@angular/core';

import { Session, Serie } from "../../../classes/session";

@Component({
  selector: 'app-shots',
  templateUrl: './shots.component.html',
  styleUrls: ['./shots.component.scss']
})
export class ShotsComponent implements OnInit {

  number_of_shots_part: number | string;
  number_of_shots_serie: number | string;

  @Input() set session(session: Session){
    const part = session.sessionParts[session.sessionIndex];
    const disziplinPart = session.disziplin.parts[part.type];
    const serie = part.serien[part.serien.length-1];
    
    if (disziplinPart.anzahlShots != 0) this.number_of_shots_part = part.anzahl + " / " + disziplinPart.anzahlShots;
    else this.number_of_shots_part = part.anzahl;
    
    this.number_of_shots_serie = serie.anzahl + " / " + disziplinPart.serienLength;
  };
  
  ngOnChanges() {
    
  }


  constructor() { }

  ngOnInit() {
  }

}
