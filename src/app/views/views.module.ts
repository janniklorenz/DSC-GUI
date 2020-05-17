import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DscModule } from './dsc/dsc.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    DscModule,
  ],
})
export class ViewsModule { }
