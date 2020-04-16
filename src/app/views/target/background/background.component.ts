import { Component, OnInit, Input } from '@angular/core';

import { Target } from "../../../classes/session";

@Component({
  selector: '[app-background]',
  templateUrl: './background.component.html',
})
export class BackgroundComponent {
  private radius: number;
  private border_width: number;
  private _target: Target;
  private ringWidth: number;

  @Input() set target(target: Target) {
    this._target = target;
    this.radius = target.rings[target.rings.length-1].width + 1;
    this.ringWidth = target.rings[1].width - target.rings[0].width;
    this.border_width = this.radius / 400;
    
    console.log(target);
  };
}
