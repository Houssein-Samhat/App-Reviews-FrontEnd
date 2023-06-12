export class AppDetails{
    id : string;
    app_name : string;
    publisher_name : string;
    genres : string[];
    icon_url : string;
    screenshot_urls : string[];
    description : string;
    all_rating :number;

    constructor(id : string, app_name : string, publisher_name : string,genres : string[],icon_url : string, screenshot_urls : string[], description : string, all_rating :number){
        this.id = id;
        this.app_name = app_name;
        this.publisher_name = publisher_name;
        this.genres = genres;
        this.icon_url = icon_url;
        this.screenshot_urls  = screenshot_urls;
        this.description = description;
        this.all_rating = all_rating;
    }
}