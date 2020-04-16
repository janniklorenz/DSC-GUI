import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Session, Part } from "../../../classes/session";

@Component({
  selector: 'app-series-overview',
  templateUrl: './seriesOverview.component.html',
  styleUrls: ['./seriesOverview.component.scss']
})
export class SeriesOverviewComponent {
  
  private currentPart: Part;

  @Input() set session(session: Session) {
    this.currentPart = session.parts[session.active_part];
  }
  
  @Input()
  selectedSeriesIndex: number;
  
  @Output()
  onChangeSelection = new EventEmitter<number>();
  
  selectSeries(index: number) {
    this.onChangeSelection.emit(index);
  }

  constructor() { }
}
