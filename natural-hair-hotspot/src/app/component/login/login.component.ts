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
  //isLoggedIn: boolean = false;
  isLoggedIn: any = false;
  

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
                        this._router.navigateByUrl('');
                        this.isLoggedIn = this._userService.loggedIn;

                        console.log('Login Successful')
                        console.log('Logged in User:', this.loginRequestPayload.username)            
                        console.log('Logged in:', this.isLoggedIn)            
                      });

  }
}
