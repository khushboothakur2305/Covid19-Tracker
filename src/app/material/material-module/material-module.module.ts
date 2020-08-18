import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    MatTabsModule,
    MatSelectModule
  ],
  exports:[
    MatTabsModule,
    MatSelectModule
  ]
})
export class MaterialModuleModule { }
