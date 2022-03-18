import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  // Where the movies returned from the API call will be kept
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) { }

  // This is called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
  }

  // Will fetch the movies from the FetchApiDataService using getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

}
