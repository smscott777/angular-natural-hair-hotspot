import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {
    private signUpUrl = "http://localhost:9090/api/v1/auth/signup";

    constructor(private http: HttpClient) {}

    saveUser(user: User): Observable<User>{
        const saveUrl = `${this.signUpUrl}`;
        return this.http.post<User>(saveUrl, user);
    }
}