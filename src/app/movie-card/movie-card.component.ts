import { Component, OnInit } from '@angular/core';
import { DetailsCardComponent } from '../details-card/details-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  // Where the movies returned from the API call will be kept
  username: any = localStorage.getItem('username');
  //user: any = JSON.parse(this.username);
  //currentUser: any = null;
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  // This is called when Angular is done creating the component
  ngOnInit(): void {
    this.getUser();
    this.getMovies();
    this.getFavorites();
  }

  getUser(): void {
    this.fetchApiData.getProfile().subscribe((resp: any) => {
      // this.currentUser = resp;
    });
  }

  // Will fetch the movies from the FetchApiDataService using getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log('Setting all movies to ' + this.movies);
      // console.log(this.movies);
    })
  }

  getFavorites(): void {
    this.fetchApiData.getFavorites(this.username).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      // console.log('Setting favorite movies to ')
      // console.log(this.favoriteMovies)
    });
  }

  showDetails(title: string, director: string, imagePath: any, description: string): void {
    this.dialog.open(DetailsCardComponent, {
      data: {
        Title: title,
        Director: director,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
  }

  showDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      }
    });
  }

  showGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      }
    });
  }

  isFavorite(movieID: string): Boolean {
    // Check if movie is in favorites
    let favoriteMatch = this.favoriteMovies.filter(function (e: any) {
      return e === movieID;
    })
    let favoriteExists = favoriteMatch.length;

    if (favoriteExists > 0) {
      return true;
    } else {
      return false;
    }
  }

  toggleFavorite(movieID: string): void {
    if (this.isFavorite(movieID)) {
      // Remove from favorites
      this.removeFromFavorites(movieID);
    } else {
      // Add to favorites
      this.addToFavorites(movieID);
    }
  }

  addToFavorites(movieID: string): void {
    // Check if movie is in favorites
    let favoriteMatch = this.favoriteMovies.filter(function (e: any) {
      return e === movieID;
    })
    let favoriteExists = favoriteMatch.length;

    this.fetchApiData.addFavorite(movieID).subscribe((resp: any) => {
      // Notify user of success
      this.snackBar.open('Added to favorites', 'OK', {
        duration: 2000
      });
    });
    // Update user data in client
    this.ngOnInit();
  }

  removeFromFavorites(movieID: string): void {
    this.fetchApiData.deleteFromFavorites(movieID).subscribe((resp: any) => {
      // Notify user of success
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000
      });
    });
    // Update user data in client
    this.ngOnInit();
  }

}
