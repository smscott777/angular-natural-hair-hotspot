import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

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
  

  constructor(private _userService: UserService,
              private _router: Router) {
      this.loginRequestPayload = {
        username: '',
        password: '', 
      };
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this._userService.login(this.loginRequestPayload)
                      .subscribe(data => {
                        this.isLoggedIn = this._userService.loggedIn;
                        this.loggedInUsername = this._userService.getUsername();
                        this._router.navigateByUrl(''); 

                        console.log('Login Successful')
                        console.log('Logged in User:', this.loggedInUsername)     
                        console.log('local storage: ', this._userService.getLocalStorage())       
                      });
  }
    
  // Logs out a user and clears the Login input boxes.
  logout() {
    this._userService.logout().subscribe();
    this.isLoggedIn = false;

    this.loginForm.setValue({
      username: '',
      password: ''
    });
  
    this._router.navigateByUrl('');

    console.log('Logged out successfully.')
    console.log('local storage: ', this._userService.getLocalStorage())       
  }
}
