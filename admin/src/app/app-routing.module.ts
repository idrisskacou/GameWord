import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchesListComponent } from './launches/launches-list/launches-list.component';
import { AiComponent } from './ai/ai/ai.component';
import { MapComponent } from './map/map/map.component';
import { ContactComponent } from './contact/contact/contact.component';
import { AboutComponent } from './about/about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { LaunchCardComponent } from './launch-card/launch-card.component';
import { LaunchComponent } from './launch/launch.component';
import { LaunchDetailComponentComponent } from './launch-detail-component/launch-detail-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  // { path: '', redirectTo: '/launches', pathMatch: 'full' }, // Default redirect to launches
  { path: '', component: LaunchComponent}, // Default redirect to launches
  { path: 'launches', component: LaunchesListComponent},   // Route for the launches list
  // { path: 'launches', component: LaunchesListComponent, resolve: { launch: LaunchResolver } },   // Route for the launches list
  { path: 'ai', component: AiComponent },
  { path: 'launch/:id', component: LaunchDetailComponentComponent, resolve: { launch: LaunchComponent }}, // Preload launches data},
  { path: 'map', component: MapComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent},
  // { path: 'launch-card', component: LaunchCardComponent },   // Route for launch details
  { path: '**', component: NotFoundComponent },             // Wildcard for 404 errors
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
