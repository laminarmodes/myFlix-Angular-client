/** 
 * The fetch-api-data contains a set of functions that fetch data from the movie API
 * @module fetch-api-data
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://myflixappcf.herokuapp.com/'

/** Endpoints
 * @enum
 */
enum Endpoints {
  login = 'login',
  users = 'users',
  movies = 'movies',
  singleMovie = 'movies/:movieId',
  director = 'directors/:name',
  genre = 'genres/:name',
  profile = 'profile'
}

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient) {
  }

  /** Sends a post request to register new users
   * @param userDetails the details entered by the user
   * @returns the API response
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + Endpoints.users, userDetails).pipe(catchError(this.handleError));
  }

  /** Displays and returns errors recieved
   * @param error of type HttpErrorResponds
   * @returns any response
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }

  /** Sends a post request to register new users
   * @param userDetails the details entered by the user
   * @returns the API response
   */
  public userRegisteration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + Endpoints.users, userDetails)
      .pipe(catchError(this.handleError));
  }

  /** Takes in the user's login information and makes a POST request
   * to the API to log the user in
   * @param userDetails the details entered by the user
   * @returns any response
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + Endpoints.login, userDetails)
      .pipe(catchError(this.handleError));
  }

  /** Gets all the movies from the API using a GET request
   * @returns any response
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + Endpoints.movies, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Extracts the response from the data */
  private extractResponseData(data: any | Object): any {
    const body = data;
    return body || {};
  }

  /** Get's a single movie through a GET request to the API */
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + Endpoints.singleMovie, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Gets the director information through a GET request to the API
   * @returns any response
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + Endpoints.director, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Gets the genre information through a GET request to the API 
   * @returns any response
  */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + Endpoints.genre, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Gets the profile information of the current user logged in
   * @returns any response
   */
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Gets the favorite movies by making a GET request to the API
   * @param userName the current user logged in
   * @returns any response
   */
  getFavorites(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${userName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Adds a movie to the favorites list by making a post request to the API
   * @param movieId the ID of the movie to be added
   * @returns any response
   */
  addFavorite(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('username');
    return this.http.post(apiUrl + `users/${userName}/movies/${movieId}`, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Deletes a movie from the favorites by making a DELETE request to the API
   * @param movieId the ID of the movie to be deleted
   * @returns any resposne
   */
  deleteFromFavorites(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${userName}/movies/${movieId}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Updates the user information by making a put request to the API
   * @param userData details about the user
   * @returns any response
   */
  editUser(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('username');
    return this.http.put(apiUrl + `users/${userName}`, userData, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Deletes the user data by making a delete requet to the API
   * @returns any response
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${userName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

} //: export class FetchApiDataService 


