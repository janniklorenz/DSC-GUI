import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ViewsModule } from './views/views.module';

import { DscApiService } from "./dsc-api.service";
import { DscAPI_Token, DscAPIInterface } from "./views/dsc/api";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewsModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: DscAPI_Token, useExisting: DscApiService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
