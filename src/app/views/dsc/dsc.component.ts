import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { DscApiService } from "../../dsc-api.service";
import { Session, DisciplinePart, Part, DSCConfig} from "../../classes/session";

@Component({
  selector: 'app-dsc',
  templateUrl: './dsc.component.html',
  styleUrls: ['./dsc.component.scss'],
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
export class DscComponent implements OnInit {

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
  
  getCurrentShot(){
    return this.getCurrentSeries().shots[this.selectedShotIndex];
  }
  getCurrentSeries(){
    return this.activePart.series[this.selectedSeriesIndex];
  }

  ngOnInit() {
  }

}
