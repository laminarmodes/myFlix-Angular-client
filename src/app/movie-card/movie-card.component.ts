/** 
 * Renders the collection of movies retreived from the API
 * @module MovieCardComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import { DetailsCardComponent } from '../details-card/details-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  username: any = localStorage.getItem('username');
  movies: any[] = [];
  favoriteMovies: any[] = [];
  loading: any = false;
  color: any = 'primary';
  mode: any = 'indeterminate';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
    this.getFavorites();
  }

  /** Gets user profile information */
  getUser(): void {
    this.fetchApiData.getProfile().subscribe((resp: any) => {
    });
  }

  /** Will fetch the movies from the FetchApiDataService using getAllMovies() */
  getMovies(): void {
    this.loading = true;
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.loading = false;
    })
  }

  /** Gets favorite movies */
  getFavorites(): void {
    this.fetchApiData.getFavorites(this.username).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
    });
  }

  /** Opens a dialogue and displays details about the movie
   * @param title is the movie title string
   * @param director is the movie director string
   * @param imagePath is the path to the image for the movie
   * @param description is the description of the movie
   */
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

  /** Opens a dialogue and displays information about the director
   * @param name string for the director's name
   * @param bio string for the director's biography
   * @param birth string indicating the director's date of birth
   */
  showDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      }
    });
  }

  /** Opens a dialogue and displays a description about 
   * the genre
   * @param name string name of the genre
   * @param description string of the genre description
   */
  showGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      }
    });
  }

  /** Checks to see if movie is contained in facorites
   * @param movieID string
   * @returns true of the movie is in favorites
   */
  isFavorite(movieID: string): Boolean {
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

  /** Changes the state of a movie from 'favorite' to 'not favorite' or 'not favorite
   * to favorite
   * @param movieID string representing the movie ID
   */
  toggleFavorite(movieID: string): void {
    if (this.isFavorite(movieID)) {
      this.removeFromFavorites(movieID);
    } else {
      this.addToFavorites(movieID);
    }
  }

  /** Adds the movie to the user's favorite's list
   * @param movieID string represengint the movie ID
   */
  addToFavorites(movieID: string): void {
    this.fetchApiData.addFavorite(movieID).subscribe((resp: any) => {
      this.snackBar.open('Added to favorites', 'OK', {
        duration: 2000
      });
    });
    this.ngOnInit();  // Update user data in client
  }

  /** Removes the movie from the user's favorite's list
   * @param movieID string represengint the movie ID
   */
  removeFromFavorites(movieID: string): void {
    this.fetchApiData.deleteFromFavorites(movieID).subscribe((resp: any) => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000
      });
    });
    this.ngOnInit();    // Update user data in client
  }

} //: class MovieCardComponent implements OnInit
