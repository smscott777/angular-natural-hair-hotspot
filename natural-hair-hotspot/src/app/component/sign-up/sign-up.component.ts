import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../common/user';
import {SignUpService} from '../../service/sign-up.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit{

    user: User = new User();
    createRegisterForm: FormGroup;
    registered: boolean;

    constructor(private _router: Router,
                private _signUpService: SignUpService) {}

    ngOnInit() {
        this.createRegisterForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),      // '' Will allow the email to still register blank.
            username: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    registerUser(){
        this.user.email = this.createRegisterForm.get('email').value;
        this.user.username = this.createRegisterForm.get('username').value;
        this.user.firstName = this.createRegisterForm.get('firstName').value;
        this.user.lastName = this.createRegisterForm.get('lastName').value;
        this.user.password = this.createRegisterForm.get('password').value;

        this._signUpService.saveUser(this.user)
                            .subscribe(data => {
                                console.log('Response:', data)
                                this.registered = true;
                            });
        //this._router.navigateByUrl('/');
    }
/*
    processResults(){
        return data => {
            this.user.email = data.user.email;
            this.user.username = data.user.username;
            this.user.firstName = data.user.firstName;
            this.user.lastName = data.user.lastName;
            this.user.password = data.user.password;
        }
    }
*/
}