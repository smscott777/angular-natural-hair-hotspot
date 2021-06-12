import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequestPayload: LoginRequestPayload;
  loginForm: FormGroup; 
  isLoggedIn: any = false;
  loggedInUsername: any = null;
  response: any;  // The response message from the server when login fails

  constructor(private _userService: UserService,
              private _router: Router) {
      this.loginRequestPayload = {
        username: '',
        password: '', 
      };
   }

   /**
    * On  page load, ensures previous user is logged out.
    * Creates a new login form.
    */
  ngOnInit(): void {
    this.isLoggedIn = this._userService.getLoggedInStatus();
    
    if(this.isLoggedIn) {
      this.loggedInUsername = this._userService.getUsername();
    }
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  /**
   * Stores the username and password input by the user from the login form to the login request payload.
   * Logs in the user if the credentials are a match in the database, 
   * otherwise displays a failed login message.
   * Navigates user to the home page.
   */
  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this._userService.login(this.loginRequestPayload)
                      .subscribe(data => {
                        this.isLoggedIn = this._userService.getLoggedInStatus();
                        this.loggedInUsername = this._userService.getUsername();
                        this._router.navigateByUrl(''); 
                        
                      }, (error: HttpErrorResponse) => {
                            this.response = "Login failed.";
                          }
                      );
  }
    
  /**
   * Logs out a user and clears the Login input boxes.
   * Navigates to home page.
   */
  logout() {
    this._userService.logout().subscribe();
   // this.isLoggedIn = this._userService.getLoggedInStatus();
    this.isLoggedIn = false;
    this.response = null;

    this.loginForm.setValue({
      username: '',
      password: ''
    });
  
    this._router.navigateByUrl('');
  }
}