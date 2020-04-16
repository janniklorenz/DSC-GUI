import { Component, OnInit, Input } from '@angular/core';

import {Ring, Target} from '../../../classes/session';

@Component({
  selector: '[app-ring-text]',
  templateUrl: './ring-text.component.html',
})
export class RingTextComponent {

  private _ring: Ring;
  @Input() set ring(ring: Ring) {
    this._ring = ring;
    this.update();
  }

  private _nextRing: Ring;
  @Input() set nextRing(nextRing: Ring) {
    this._nextRing = nextRing;
    this.update();
  }
  
  private _ringWidth: number;
  @Input() set ringWidth(ringWidth: number) {
    this._ringWidth = ringWidth;
    this.update();
  }
  

  private ringSize: number;
  private fontSize: number;
  private fontSizeCorrectionX: number;
  private fontSizeCorrectionY: number;

  update() {
    // if (this._ring != null && this._nextRing != null) {
    //   // this.ringSize = this._ring.width - this._nextRing.width;
    //   this.ringSize = this._nextRing.width - this._ring.width;
    // }
    this.fontSize = this._ringWidth*0.6;
    this.fontSizeCorrectionX = this._ringWidth*0.30;
    this.fontSizeCorrectionY = this._ringWidth*0.30;
  }

}
