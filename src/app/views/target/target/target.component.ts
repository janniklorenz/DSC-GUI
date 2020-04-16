import { Component, OnInit, Input } from '@angular/core';

import { Session, Target, Serie } from "../../../classes/session";

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
})
export class TargetComponent implements OnInit {
  
  _target: Target;
  @Input() set target(target: Target) {
    this._target = target;
    this.calc();
  }
  
  _series: Serie;
  @Input() set series(series: Serie) {
    this._series = series;
    this.calc();
  }
  
  private _selectedShotIndex: number;
  @Input() set selectedShotIndex(selectedShotIndex: number) {
    this._selectedShotIndex = selectedShotIndex;
    this.calc();
  }
  
  
  
  @Input() has_trial_corner: boolean = false;

  @Input() width: string = "200";
  @Input() height: string = "200";

  private viewBox: string = "";


  private radius: number;
  private border_width: number;
  private scale: number;
  
  private calc() {
    if (this._target == null) {return}
    
    this.radius = this._target.rings[this._target.rings.length-1].width + 1;
    this.border_width = this.radius / 400;

    if (this._series != null && this._selectedShotIndex != null) {
      this.scale = this.calculateScale(this._series, this._target);
    }
    else {
      this.scale = 1;
    }

    this.viewBox = ((-this.radius)/this.scale) + " " + ((-this.radius)/this.scale) + " " + ((2*this.radius)/this.scale) + " " + ((2*this.radius)/this.scale);
  }

  private calculateScale(series: Serie, target: Target): number {
    var shot = series.shots[this._selectedShotIndex]; // TODO save selected shot
    var zoom = 1;
    if (shot != null) {
      target.rings.every(ring => {
        if (ring.value === Math.floor(shot.ring)) {
          if (ring.zoom != null) {
            zoom = ring.zoom;
            return false;
          }
        }
        return true;
      });
    }
    return zoom;
  }
  
  
  
  
  calculateHeight: () => void = () => {};
  
  ngOnInit() {
    
    var ua = navigator.userAgent.toLowerCase(); 
    if (ua.indexOf('safari') != -1) { 
      if (ua.indexOf('chrome') > -1) { // Chrome
      } else { // Safari
        this.calculateHeight = () => {
          this.height = document.getElementById("target_super").clientHeight + "px";
        }
      }
    }
    
  }
  
  ngAfterViewInit() {
    setTimeout(this.calculateHeight, 0.1);
  }
  
  onResize(event) {
    this.calculateHeight()
  }
}
