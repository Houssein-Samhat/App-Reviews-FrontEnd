export class Genre {
    name : string;
    genre_id : string;
    app_icon : string;

    constructor( name: string, genre_id: string, app_icon: string){
        this.name = name;
        this.genre_id = genre_id;
        this.app_icon = app_icon;
    }
}
