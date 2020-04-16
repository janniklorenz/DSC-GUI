import { Component, OnInit, Input } from '@angular/core';

import { Session, Part } from "../../../classes/session";

@Component({
  selector: 'app-average',
  templateUrl: './average.component.html',
  styleUrls: ['./average.component.scss']
})
export class AverageComponent implements OnInit {

  private part: Part;

  @Input() set session(session: Session) {
    this.part = session.parts[session.active_part];
    console.log(this.part)
  }

  constructor() { }

  ngOnInit() {
  }

}
