import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { GenresDashboardComponent } from './pages/genres-dashboard/genres-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GenreCardComponent } from './components/genre-card/genre-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GenreSvc } from './services/genreService';
import { GenreAppsComponent } from './pages/genre-apps/genre-apps.component';
import { AppViewCardComponent } from './components/app-view-card/app-view-card.component';
import { GenerAppsService } from './services/genreAppsService';
import { AppDetailsComponent } from './pages/app-details/app-details.component';
import { AppDetailService } from './services/appDetailService';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GenresDashboardComponent,
    NavBarComponent,
    GenreCardComponent,
    GenreAppsComponent,
    AppViewCardComponent,
    AppDetailsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [CookieService,GenreSvc,GenerAppsService,AppDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private cookieService: CookieService,private router: Router){
    alert("Fired First")
    if (this.cookieService.check('token')) {
      this.router.navigate(['/genres_dashboard']);
    }
    else {
       this.router.navigate(['login']);
       //this.router.navigate(['/genres_dashboard']);
    }
  }

}
