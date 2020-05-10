import { Component, HostListener } from '@angular/core';

import { DscApiService } from "./dsc-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DSC';

  socketConnected: Boolean = false;
  dscAPI: DscApiService;
  
  constructor(dscAPI: DscApiService) {
    this.dscAPI = dscAPI;
    dscAPI.connected.subscribe(connected => this.socketConnected = connected);
	}
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    // alert(event.key)
    if (event.key=="F1") {
      // UP
      // alert("F1")
    }
    else if (event.key=="F2") {
      // DOWN
      // alert("F2")
    }
    else if (event.key=="F3") {
      // Menu/ Enter
      // alert("F3")
    }
    else if (event.key=="F4") {
      // Rechts Unten
      // alert("F4")
    }
    else if (event.key=="F5") {
      // Neue Scheibe
      // alert("F5")
      this.dscAPI.setNewTarget();
    }
    else if (event.key=="F6") {
      // Zoom
      // alert("F6")
    }
    else if (event.key=="F7") {
      // Druck
      // alert("F7")
      this.dscAPI.print();
    }
    else if (event.key=="F8") {
      // Probe Match
      // alert("F8")
      this.dscAPI.togglePart();
    }
    
    
    
    console.log(event)
    // this.key = event.key;
  }

}
