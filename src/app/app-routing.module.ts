import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DscComponent } from './views/dsc/dsc/dsc.component';
import { DscPrintComponent } from './views/dsc/dsc-print/dsc-print.component';

const routes: Routes = [
  { path: "", component: DscComponent },
  { path: "print", component: DscPrintComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
