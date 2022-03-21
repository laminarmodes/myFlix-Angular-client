/** 
 * Renders the user registration dialog
 * @module UserRegistrationFormComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /** This is the function responsible for sending the form inputs 
   * to the backend */
  registerUser(): void {
    this.fetchApiData.userRegisteration(this.userData)
      .subscribe((result) => {
        this.dialogRef.close();
        this.snackBar.open('You have been registered', 'OK', {
          duration: 4000
        });
      }, (result) => {
        this.snackBar.open('Thank you for registering', 'OK', {
          duration: 4000
        });
      });
  }

} //: export class UserRegistrationFormComponent implements OnInit
