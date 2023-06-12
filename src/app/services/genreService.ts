import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Genre } from "../models/genre";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class GenreSvc{
    //genres : Genre[] = [];
    
    country! : string;
    date! : string;
    store! : string;

    genre_name : string ="";
    genre_id : string = "";
    
    constructor(private http : HttpClient,private cookieService: CookieService){}

    getAllGenresApiCall(store:string, country:string, date:string){
        var token = this.cookieService.get('token');
        const headers = new HttpHeaders().set("Authorization",`Bearer ${token}`);
        console.log(token);
        return this.http.get(`https://localhost:7035/api/AppAPI/genres?store=${store}&country=${country}&date=${date}`,{headers});
    }
}