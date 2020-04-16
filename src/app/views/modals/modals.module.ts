import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { SelectPartModalComponent } from './selectPart/selectPart.component';

@NgModule({
  declarations: [
    SelectPartModalComponent
  ],
  imports: [
    CommonModule, FlexLayoutModule,
  ],
  exports: [
    SelectPartModalComponent,
  ],
})
export class ModalsModule { }
