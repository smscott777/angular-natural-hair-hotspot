import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../common/login-request.payload';
import { LoginResponse } from '../common/login-response.payload';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
    @Output() username: EventEmitter<string> = new EventEmitter();

    constructor(private http: HttpClient,
                private localStorage: LocalStorageService) {}

    login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
        return this.http.post<LoginResponse>(`http://localhost:9090/api/v1/auth/login`, loginRequestPayload)
                        .pipe(map(data => {
                            this.localStorage.store('username', data.username);

                            this.loggedIn.emit(true);
                            this.username.emit(data.username);
                            return true;
                        }));
    }

    getUsername() {
        return this.localStorage.retrieve('username');
    }
}