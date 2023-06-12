import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppView } from 'src/app/models/app_view';
import { GenerAppsService } from 'src/app/services/genreAppsService';

@Component({
  selector: 'app-view-card',
  templateUrl: './app-view-card.component.html',
  styleUrls: ['./app-view-card.component.css']
})
export class AppViewCardComponent {

  @Input() appView! : AppView;

  constructor(private genreAppSvc : GenerAppsService,private router:Router){}

  showAppDetails(appId:string){
    this.genreAppSvc.selected_app_id = appId;
    this.router.navigate(['app_details']);
  }

  getRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return Array(fullStars).fill(1).concat(Array(halfStars).fill(0.5)).concat(Array(emptyStars).fill(0));
  }

}
