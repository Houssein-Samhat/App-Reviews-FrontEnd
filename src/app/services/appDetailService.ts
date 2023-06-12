import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AppDetailService{
    appId : string = "";

    store : string = "";
    country : string = "";

    constructor(private http:HttpClient,private cookieService : CookieService){}

    getAppDetails(){
        var token = this.cookieService.get('token');
        const headers = new HttpHeaders().set("Authorization",`Bearer ${token}`);
        return this.http.get(`https://localhost:7035/api/AppAPI/app?appId=${this.appId}&store=${this.store}&country=${this.country}`,{headers});
    }
}