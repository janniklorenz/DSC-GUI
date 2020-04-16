import { Component, OnInit, Input } from '@angular/core';

import { Club, Team } from "../../../classes/session";

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {

  @Input() club: Club;
  @Input() team: Team;

  constructor() { }

  ngOnInit() {
  }

}
