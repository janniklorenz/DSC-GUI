import { Component, OnInit, Input } from '@angular/core';

import { Shot, Target, Ring, Color } from "../../../classes/session";

@Component({
  selector: '[app-shot]',
  templateUrl: './shot.component.html',
})
export class ShotComponent {
  @Input() shot: Shot;

  private _target: Target;
  private ring: Ring;
  @Input() set target (target: Target) {
    this._target = target;
    this.ring = target.rings.filter(ring => ring.value === Math.floor(this.shot.ring))[0];

    this.hit_color = target.default_hit_color;
    if (this.ring) {
      this.hit_color = this.ring.hit_color;
    }

  };
  @Input() transparent: boolean;

  private hit_color: Color;
}
