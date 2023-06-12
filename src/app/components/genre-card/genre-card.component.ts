import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from 'src/app/models/genre';
import { GenreSvc } from 'src/app/services/genreService';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.css']
})
export class GenreCardComponent {
  @Input() genre! : Genre;

  constructor(private genreSvc:GenreSvc,private router:Router){}

  showGenre(genreId:string,genreName:string){
    this.genreSvc.genre_id = genreId;
    this.genreSvc.genre_name = genreName;
    this.router.navigate(['/genre_apps']);
  }

}
