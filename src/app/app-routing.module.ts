import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GenresDashboardComponent } from './pages/genres-dashboard/genres-dashboard.component';
import { GenreAppsComponent } from './pages/genre-apps/genre-apps.component';
import { AppDetailsComponent } from './pages/app-details/app-details.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'genres_dashboard', component: GenresDashboardComponent},
  {path:'genre_apps', component: GenreAppsComponent},
  {path:'app_details', component : AppDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
