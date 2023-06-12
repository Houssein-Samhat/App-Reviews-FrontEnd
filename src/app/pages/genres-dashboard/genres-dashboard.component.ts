import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { Genre } from 'src/app/models/genre';
import { GenreSvc } from 'src/app/services/genreService';

@Component({
  selector: 'app-genres-dashboard',
  templateUrl: './genres-dashboard.component.html',
  styleUrls: ['./genres-dashboard.component.css']
})
export class GenresDashboardComponent implements OnInit {
  genres : Genre[] = [];

  selectedDate : string = "";
  store : string = "android";
  country : string = "";

  isLoading : boolean = false;

  startDate : string = '';
  maxDate : string = '';

  countries : Country[] = [
    new Country("United State","US"),
    new Country("Lebanon","LB"),
    new Country("Angola","AO"),
    new Country("United Arab Emirates","AE"),
    new Country("Japan","JP"),
    new Country("Ukraine","UA"),
    new Country("Qatar","QA"),
    new Country("Canada","CA"),
    new Country("Germany","DE")
  ];

  constructor(private genreService : GenreSvc,private router: Router){}

  ngOnInit(): void {
    this.firstRunInitValues();

    this.serviceInitialization();

    this.callApi(this.store,this.country,this.selectedDate);
  }

  callApi(store: string, country: string, date: string) {
    const key = store + ' ' + date + ' ' + country;
    //check if data is already called before and saved in localStorage
    if(this.checkLocalStorage(key)===true){
      const storedData = localStorage.getItem(key);
      const { data, expiration } = JSON.parse(storedData!);
      this.genres = JSON.parse(data);
      this.isLoading = false;
    }
    else{
      this.isLoading = true;

      this.genreService.getAllGenresApiCall(store, country, date).subscribe(
        (response: any) => {
          this.genres = response.map((item: any) => {
            return new Genre(item.name, item.genre_id, item.first_app_logo);
          });
          //save the data in localStorage with expiration time (only one day) to reduce the api calls
          const currentTime = Date.now();
          const expirationTime = currentTime + 1 * 60 * 60 * 1000;
          const dataWithExpiration = {
            data: JSON.stringify(this.genres), // Convert this.apps to a JSON string
            expiration: expirationTime
          };

          localStorage.setItem(key, JSON.stringify(dataWithExpiration));
    
          this.isLoading = false;
        },
      );
    }
  }

  firstRunInitValues(){
    this.country = this.countries[0].code;

    this.startDate = new Date().toISOString().substring(0, 10);
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    this.maxDate = oneYearFromNow.toISOString().substring(0, 10);

    this.selectedDate = this.formatDate(this.startDate);
  }

  serviceInitialization(){
    this.genreService.store = this.store;
    this.genreService.country = this.country;
    this.genreService.date = this.selectedDate;
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

  active_store(store : string){
    this.store = store;

    this.genreService.store = store;

    this.callApi(this.store,this.country,this.selectedDate);
  }

  onCountryChange(event:Event){
    const selectedCode = (event.target as HTMLSelectElement).value;

    console.log('Selected Country Code:', selectedCode);

    this.genreService.country = selectedCode;

    this.callApi(this.store,selectedCode,this.selectedDate);
  }

  dateChanged(event:Event){
    const selectedDate = (event.target as HTMLSelectElement).value;
    console.log('Selected date Code:', selectedDate);
    this.selectedDate = this.formatDate(selectedDate).toString();

    console.log("This date "+this.selectedDate);

    this.genreService.date = this.selectedDate;

    this.callApi(this.store,this.country,this.selectedDate);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
}
