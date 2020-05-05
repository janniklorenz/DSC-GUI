import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { DscApiService } from "../../dsc-api.service";
import { Session, DisciplinePart, Part, DSCConfig, Serie} from "../../classes/session";

@Component({
  selector: 'app-dsc-print',
  templateUrl: './dsc-print.component.html',
  styleUrls: ['./dsc-print.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('200ms', style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('200ms', style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class DscPrintComponent implements OnInit {

  private selectedShotIndex: number = 0;
  private selectedSeriesIndex: number = 0;
  
  private disciplinePart: DisciplinePart;
  
  session: Session;
  dscConfig: DSCConfig;
  activePart: Part;
  
  hasOpenMenu = {state: false, menuTitle: "", triggerClose: false};
  closeMenu() {
    this.hasOpenMenu = {state: false, menuTitle: "", triggerClose: true};
  }
  
  

  constructor(dscAPI: DscApiService) {
    dscAPI.connected.subscribe(connected => console.log("isConnected", connected))
    dscAPI.session.subscribe(session => {
      // console.log("setSession", session);
      
      if (session != null) {
        this.activePart = session.parts[session.active_part];
        this.selectedSeriesIndex = this.activePart.series.length - 1;
        this.selectedShotIndex = this.activePart.series[this.selectedSeriesIndex].shots.length - 1;
        this.disciplinePart = session.discipline.parts.find(part => part.id == this.activePart.part_type);
      }
      this.session = session;
      
      
    });
    
    dscAPI.config.subscribe(config => {
      this.dscConfig = config;
    });
	}
  
  getDummyRowsForPart(type: string, series: Serie) {
    const dp = this.getDisciplinePart(type);
    const dummyRows = dp.series_length - series.shots.length;
    return Array(dummyRows).fill(0);
  }
  
  getDisciplinePart(type: string) {
    return this.session.discipline.parts.find(dp => dp.id == type);
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
