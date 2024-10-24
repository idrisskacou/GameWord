import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BottombarComponent } from './bottombar/bottombar.component';
import { BodyComponent } from './body/body.component';
import { LaunchesModule } from './launches/launches.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NotFoundComponent } from './not-found/not-found.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LaunchDetailComponentComponent } from './launch-detail-component/launch-detail-component.component';
import { LaunchComponent } from './launch/launch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BottombarComponent,
    BodyComponent,
    NotFoundComponent,
    LaunchDetailComponentComponent,
    LaunchComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LaunchesModule,
    GoogleMapsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
    // HttpClient.withFetch() // Enable fetch for HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
