export class AppView {
    appId : string = "";
    appName : string = "";
    publisher_name : string = "";
    icon_url : string = "";
    rating : number ;

    constructor(appId : string ,appName : string,publisher_name : string,icon_url : string,rating : number){
        this.appId = appId;
        this.appName = appName;
        this.publisher_name = publisher_name;
        this.icon_url = icon_url;
        this.rating = rating;
    }

}
