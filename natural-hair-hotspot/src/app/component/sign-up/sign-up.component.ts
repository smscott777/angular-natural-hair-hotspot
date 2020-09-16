import {Component, OnInit} from '@angular/core';
import {User} from '../../common/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit{

    user: User = new User();
    registerForm: FormGroup;
    registered: boolean;

    constructor(private _userService: UserService) {}

    ngOnInit() {
        this.registerForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),  // '' Would still allow user to register when email is blank.
            username: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    // Takes values input to the register form to register a new user.
    registerUser(){
        this.user.email = this.registerForm.get('email').value;
        this.user.username = this.registerForm.get('username').value;
        this.user.firstName = this.registerForm.get('firstName').value;
        this.user.lastName = this.registerForm.get('lastName').value;
        this.user.password = this.registerForm.get('password').value;

        // The value of data is the ResponseEntity body from User Controller (Backend)
        this._userService.registerUser(this.user)
                                .subscribe(data => {
                                    console.log('Response:', data)  
                                    this.registered = true;
                                });
    }
}