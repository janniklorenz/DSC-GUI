import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { DscApiService } from "../../dsc-api.service";
import { Session, DisciplinePart, Part, Config, Serie} from "../../classes/session";

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
  config: Config;
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
        this.activePart = session.sessionParts[session.sessionIndex];
        
        if (this.activePart.anzahl > 0) {
          this.selectedSeriesIndex = this.activePart.serien.length - 1;
          this.selectedShotIndex = this.activePart.serien[this.selectedSeriesIndex].shots.length - 1;
        }
        else {
          this.selectedSeriesIndex = null;
          this.selectedShotIndex = null;
        }
        
        this.disciplinePart = session.disziplin.parts[this.activePart.type]
      }
      this.session = session;
      
      
    });
    
    dscAPI.config.subscribe(config => {
      this.config = config;
    });
	}
  
  getDummyRowsForPart(type: string, series: Serie) {
    const dummyRows = this.session.disziplin.parts[type].serienLength - series.shots.length;
    return Array(dummyRows).fill(0);
  }
  
  getCurrentShot(){
    return this.getCurrentSeries().shots[this.selectedShotIndex];
  }
  getCurrentSeries(){
    return this.activePart.serien[this.selectedSeriesIndex];
  }

  ngOnInit() {
  }

}
