import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequestPayload: LoginRequestPayload;
  loginForm: FormGroup;
  isLoggedIn: boolean = false;

  constructor(private _authService: AuthService,
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

    this._authService.login(this.loginRequestPayload)
                      .subscribe(data => {
                        this._router.navigateByUrl('');
                        this.isLoggedIn = true;

                        console.log('Login Successful')
                        console.log('Logged in User:', this.loginRequestPayload.username)            
                        console.log('Logged in:', this.isLoggedIn)            
                      });
  }
}
