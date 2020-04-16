import { Component, OnInit, Input } from '@angular/core';

import { Discipline } from "../../../classes/session";

@Component({
  selector: 'app-disciplin',
  templateUrl: './disciplin.component.html',
  styleUrls: ['./disciplin.component.scss']
})
export class DisciplinComponent implements OnInit {

  @Input() discipline: Discipline;

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    // show_modal_discipline
  }

}
