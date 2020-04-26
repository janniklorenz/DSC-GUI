import { Component, OnInit, Input } from '@angular/core';

import { Session } from "../../../classes/session";

@Component({
  selector: 'app-sum',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.scss']
})
export class SumComponent implements OnInit {

  sum_part: number;
  sum_serie: number;

  @Input() set session(session: Session){
    const part = session.parts[session.active_part];
    const serie = part.series[part.series.length-1];
    this.sum_part = part.sum.text;
    this.sum_serie = serie.sum.text;
  };

  constructor() { }

  ngOnInit() {
  }

}
