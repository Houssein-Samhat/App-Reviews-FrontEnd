import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class GenerAppsService{
    selected_app_id = "";

    genre_id! : string;
    store! : string; 
    country! : string;
    date! : string;


    constructor(private http:HttpClient,private cookieService : CookieService){}

    getAllGenreApps(){
        var token = this.cookieService.get('token');
        const headers = new HttpHeaders().set("Authorization",`Bearer ${token}`);

        return this.http.get(`https://localhost:7035/api/AppAPI/apps?genre_id=${this.genre_id}&store=${this.store}&country=${this.country}&date=${this.date}`,{headers});
    }
}