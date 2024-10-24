import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchesListComponent } from './launches-list/launches-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    LaunchesListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    LaunchesListComponent
  ]
})
export class LaunchesModule { }
