import { Component, OnInit } from '@angular/core';

import { DscApiService } from "../../dsc-api.service";
import { Session, DisciplinePart, Part } from "../../classes/session";

@Component({
  selector: 'app-dsc',
  templateUrl: './dsc.component.html',
  styleUrls: ['./dsc.component.scss']
})
export class DscComponent implements OnInit {

  private selectedShotIndex: number = 0;
  private selectedSeriesIndex: number = 0;
  
  private disciplinePart: DisciplinePart;
  
  session: Session;
  activePart: Part;
  
  private showPartModal = false
  private showGrayBackground = false;
  openPartModal(value) {
    this.showGrayBackground = value;
    // this.showPartModal = true;
  }

  constructor(dscAPI: DscApiService) {
    dscAPI.connected.subscribe(connected => console.log("isConnected", connected))
    dscAPI.session.subscribe(session => {
      console.log("setSession", session);
      
      if (session != null) {
        this.activePart = session.parts[session.active_part];
        this.selectedSeriesIndex = this.activePart.series.length - 1;
        this.selectedShotIndex = this.activePart.series[this.selectedSeriesIndex].shots.length - 1;
        this.disciplinePart = session.discipline.parts.find(part => part.id == this.activePart.part_type);
      }
      this.session = session;
      
      
    })
	}
  
  getCurrentShot(){
    return this.getCurrentSeries().shots[this.selectedShotIndex];
  }
  getCurrentSeries(){
    return this.activePart.series[this.selectedSeriesIndex];
  }

  ngOnInit() {
  }

}
