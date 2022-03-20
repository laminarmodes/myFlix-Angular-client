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

  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']).then(() => {
      window.location.reload();
    });
  }

}
