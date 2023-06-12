import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppView } from 'src/app/models/app_view';
import { GenerAppsService } from 'src/app/services/genreAppsService';
import { GenreSvc } from 'src/app/services/genreService';

@Component({
  selector: 'app-genre-apps',
  templateUrl: './genre-apps.component.html',
  styleUrls: ['./genre-apps.component.css']
})
export class GenreAppsComponent implements OnInit {
  apps : AppView[] = [];

  isLoading : boolean = false;

  genre_id : string = "";
  genre_name : string = "";

  store : string = "";
  country : string ="";
  date : string = "";

  constructor(private router: Router,private genreSvc:GenreSvc, private genreAppsSvc : GenerAppsService){
  }

  ngOnInit(): void {
    this.genre_id = this.genreSvc.genre_id;
    this.country = this.genreSvc.country;
    this.date = this.genreSvc.date;
    this.store = this.genreSvc.store;
    this.genre_name = this.genreSvc.genre_name;

    this.genreAppsSvc.country = this.country;
    this.genreAppsSvc.store = this.store;
    this.genreAppsSvc.date = this.date;
    this.genreAppsSvc.genre_id = this.genre_id;

    this.callApi();
  }

callApi(){
    const key = this.store + ' ' + this.date + ' ' + this.country + ' '+this.genre_id;

    if(this.checkLocalStorage(key)===true){
      const storedData = localStorage.getItem(key);
      const { data, expiration } = JSON.parse(storedData!);
      this.apps = JSON.parse(data);
    }
    else{
      this.isLoading = true;

      this.genreAppsSvc.getAllGenreApps().subscribe((response:any)=>{
        this.apps = response.map((item : any)=>{
          return new AppView(item['id'],item['app_name'],item['publisher_name'],item['icon_url'],item['all_rating']);
        });
        //Saving data in localStorage
        const currentTime = Date.now();
        const expirationTime = currentTime + 1 * 60 * 60 * 1000;
        const dataWithExpiration = {
          data: JSON.stringify(this.apps),
          expiration: expirationTime
        };
        localStorage.setItem(key, JSON.stringify(dataWithExpiration));

        this.isLoading = false;
      },);
    }
  }


  checkLocalStorage(key:string){
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const { data, expiration } = JSON.parse(storedData);
      if (expiration >= Date.now()) {
        return true;
      } else {
        localStorage.removeItem(key);
        return false;
      }
    }
    else{
      return false;
    }
  }

}
