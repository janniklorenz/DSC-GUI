import { Component, OnInit, Input } from '@angular/core';

import { Session, Serie } from "../../../classes/session";

@Component({
  selector: 'app-shots',
  templateUrl: './shots.component.html',
  styleUrls: ['./shots.component.scss']
})
export class ShotsComponent implements OnInit {

  number_of_shots_part: number;
  number_of_shots_serie: number;

  @Input() set session(session: Session){
    const part = session.parts[session.active_part];
    const serie = part.series[part.series.length-1];
    this.number_of_shots_part = part.number_of_shots;
    this.number_of_shots_serie = serie.number_of_shots;
  };


  constructor() { }

  ngOnInit() {
  }

}
