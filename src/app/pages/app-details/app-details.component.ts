import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AppDetails } from 'src/app/models/app_details';
import { AppView } from 'src/app/models/app_view';
import { AppDetailService } from 'src/app/services/appDetailService';
import { GenerAppsService } from 'src/app/services/genreAppsService';


@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent implements OnInit{
  app! : AppDetails;

  categories : string = "";

  //for the description
  isExpanded = false;
  showReadMore = false;
  maxHeight = '4.5em';

  constructor(private gereAppSvc : GenerAppsService,private appDetailSvc : AppDetailService){}

  ngOnInit(): void {
    this.initializeAppDetailsService();
    
    this.callApi();
    
    alert("APP DETAILS id"+ this.gereAppSvc.selected_app_id + " " + this.gereAppSvc.country + " "+this.gereAppSvc.store);
  }

  callApi(){
    this.appDetailSvc.getAppDetails().subscribe((response:any)=>{
      this.app = new AppDetails(response['id'],response['app_name'],response['publisher_name'],response['genres'],response['icon_url'],response['screenshot_urls'],response['description'],response['all_rating']);
    });
  }

  initializeAppDetailsService(){
    this.appDetailSvc.appId = this.gereAppSvc.selected_app_id;
    this.appDetailSvc.country = this.gereAppSvc.country;
    this.appDetailSvc.store = this.gereAppSvc.store;
  }

  //for creating stars for the rating of app
  getRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return Array(fullStars).fill(1).concat(Array(halfStars).fill(0.5)).concat(Array(emptyStars).fill(0));
  }

  //Functions to right only three lines of the app description

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
    this.maxHeight = this.isExpanded ? 'none' : '4.5em'; // Adjust the same value as in CSS
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateReadMoreVisibility();
  }

  ngAfterViewInit() {
    this.updateReadMoreVisibility();
  }

  updateReadMoreVisibility() {
    const lineCount = 3;
    const lineHeight = 24;
    const maxHeightPx = lineCount * lineHeight;
    this.showReadMore = this.getDescriptionHeight() > maxHeightPx;
  }

  getDescriptionHeight() {
    const descriptionElement = document.querySelector('.description');
    if (descriptionElement) {
      return descriptionElement.clientHeight;
    }
    return 0;
  }

}
