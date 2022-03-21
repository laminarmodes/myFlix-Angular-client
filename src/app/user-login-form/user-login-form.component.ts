/** 
 * Renders the user login dialog
 * @module UserLoginFormComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() userData = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /** Logs the user in and if successful, routes user to 'movies' (see app.module routes) */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.user.Username);
      this.snackBar.open('User login successful!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

} //: export class UserLoginFormComponent implements OnInit
