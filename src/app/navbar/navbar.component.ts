/** 
 * Renders the navigation bar
 * @module NavbarComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  public innerWidth: any;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  /** Checks to see, based on screen size, if the navbar should be collapsed to a 3-dot dropdown menu
   * is below a certain value
   * @returns Boolean (true) if the navbar should be collapsed
   */
  collapseNavbar(): Boolean {
    let screenSize = this.innerWidth;
    console.log("Checking screen size")
    console.log(screenSize);
    if (screenSize < 500) {
      return true;
    } else {
      return false;
    }
  }

  /** Navigates to the movies page */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /** Navigates to the profile page */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /** Logs the user out */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']).then(() => {
      window.location.reload();
    });
  }

} //: export class NavbarComponent implements OnInit
