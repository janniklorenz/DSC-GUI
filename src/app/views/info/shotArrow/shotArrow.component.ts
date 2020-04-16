import { Component, Input } from '@angular/core';

import { Shot } from "../../../classes/session";

@Component({
  selector: 'app-shot-arrow',
  templateUrl: './shotArrow.component.html',
  styleUrls: ['./shotArrow.component.scss']
})
export class ShotArrowComponent {

  private arrow: String;
  private angle: String;

  @Input() set shot(shot: Shot) {
    if (shot.is_inner_ten) {
      this.arrow = "&#9099;";
      this.angle = "rotate(" + (-shot.angle - 225) + "deg)";
    }
    else {
      this.arrow = "&#8594;";
      this.angle = "rotate(" + (-shot.angle) + "deg)";
    }
  }

  constructor() { }

}
