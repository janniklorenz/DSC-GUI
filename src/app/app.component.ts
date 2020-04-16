import { Component } from '@angular/core';

import { DscApiService } from "./dsc-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DSC';

  socketConnected: Boolean = false;

  constructor(dscAPI: DscApiService) {
    dscAPI.connected.subscribe(connected => this.socketConnected = connected);
	}

}
