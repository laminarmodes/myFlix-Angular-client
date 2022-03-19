import { Component, OnInit } from '@angular/core';
import { DetailsCardComponent } from '../details-card/details-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  username: any = localStorage.getItem('username');
  //user: any = JSON.parse(this.username);
  currentUser: any = null;
  favoriteMovies: any[] = [];
  movies: any[] = [];
  favoriteMoviesObjects: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
    this.getFavorites();
    //this.getFavoriteMoviesObjects();
  }

  getUser(): void {
    this.fetchApiData.getProfile().subscribe((resp: any) => {
      this.currentUser = resp;
      console.log('Setting current user to ');
      console.log(this.currentUser);
    });
  }

  // Will fetch the movies from the FetchApiDataService using getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('Setting all movies to ');
      console.log(this.movies);
      // Once we have the movies, we can extract the favorites
      this.getFavoriteMoviesObjects();
    })
  }

  getFavorites(): void {
    this.fetchApiData.getFavorites(this.username).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      console.log('Setting favorite movies to ')
      console.log(this.favoriteMovies)
    });
  }

  getFavoriteMoviesObjects(): void {
    console.log("getting objects")
    this.currentUser.FavoriteMovies.map((favoriteMovie: any) => {
      if (!this.favoriteMovieObjectAlreadyLoaded(favoriteMovie)) {
        console.log('Checking favorites while in user profile');
        let confirmedFavorite = this.movies.find((m: any) => m._id === favoriteMovie)
        console.log(confirmedFavorite)
        this.favoriteMoviesObjects.push(confirmedFavorite)
      }
    });
  }

  favoriteMovieObjectAlreadyLoaded(movieID: string): Boolean {
    // Check if movie is in favorites
    let favoriteMatch = this.favoriteMoviesObjects.filter(function (e: any) {
      return e._id === movieID;
    })
    let favoriteExists = favoriteMatch.length;

    if (favoriteExists > 0) {
      return true;
    } else {
      return false;
    }
  }

  removeFromFavorites(movieID: string): void {
    this.fetchApiData.deleteFromFavorites(movieID).subscribe((resp: any) => {
      // Notify user of success
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
    // Update user data in client
    this.ngOnInit();
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

}
