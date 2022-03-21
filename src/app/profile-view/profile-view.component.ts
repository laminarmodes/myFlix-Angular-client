/** 
 * Renders the profile page
 * @module ProfileViewComponent
 */
import { Component, OnInit } from '@angular/core';
import { DetailsCardComponent } from '../details-card/details-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

export class ProfileViewComponent implements OnInit {

  username: any = localStorage.getItem('username');
  currentUser: any = null;
  favoriteMovies: any[] = [];
  movies: any[] = [];
  favoriteMoviesObjects: any[] = [];
  birthday: any = null;
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

  /** Get's the user profile information and extracts and formats 
   * the birthday in advance
   */
  getUser(): void {
    this.fetchApiData.getProfile().subscribe((resp: any) => {
      this.currentUser = resp;
      let longBirthday = new Date(this.currentUser.Birthday);
      this.birthday = longBirthday.toDateString();
    });
  }

  /** Will fetch the movies from the FetchApiDataService using 
   * getAllMovies() Once we have the movies, we can extract the 
   * favorites */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.getFavoriteMoviesObjects();
    })
  }

  /** Get's the IDs user's favorite movies */
  getFavorites(): void {
    this.loading = false;
    this.fetchApiData.getFavorites(this.username).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      this.loading = true;
    });
  }

  /** Uses the favorite movie ID's to extract the favorite movies from the
   * movies
   */
  getFavoriteMoviesObjects(): void {
    console.log("getting objects")
    this.currentUser.FavoriteMovies.map((favoriteMovie: any) => {
      if (!this.favoriteMovieObjectAlreadyLoaded(favoriteMovie)) {
        let confirmedFavorite = this.movies.find((m: any) => m._id === favoriteMovie)
        this.favoriteMoviesObjects.push(confirmedFavorite)
      }
    });
  }

  /** Checks to see if the favorite movie is already loaded
   * @param movieID string representing the movie ID
   * @returns true if the movie has already been loaded
   */
  favoriteMovieObjectAlreadyLoaded(movieID: string): Boolean {
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

  /** Removies the movie from the user's favorites list
   * @param movieID string representing the movie ID
   */
  removeFromFavorites(movieID: string): void {
    this.fetchApiData.deleteFromFavorites(movieID).subscribe((resp: any) => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
    this.ngOnInit(); // Update user data in client
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

  /** Deletes the user's account */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      this.snackBar.open('Your account has been removed', 'Ok', {
        duration: 4000,
      });
      localStorage.clear();
    });
  }

  /** Opens a dialog for the user to edit their profile information */
  showEditDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '280px'
    });
  }

} //: export class ProfileViewComponent implements OnInit
