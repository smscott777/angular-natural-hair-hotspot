import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../component/login/login-request.payload';
import { LoginResponse } from '../component/login/login-response.payload';
import { map } from 'rxjs/operators';
import { FavoriteProductPayload } from '../common/favorite-product.payload';
import { User } from '../common/user';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseUrl = "http://localhost:9090/api/v1/auth";
    private loggedInStatus: boolean;

    constructor(private http: HttpClient,
                private localStorage: LocalStorageService) {}

    /**
     * Takes a new user object as an argument, then calls on the server
     * to register a new user.
     * @param user The new user.
     * @returns The Post request.
     */
    registerUser(user: User): Observable<User>{
        const registerUrl = `${this.baseUrl}/signup`;
        return this.http.post<User>(registerUrl, user, { responseType : 'text'});
    }

    /**
     * Takes a login request payload as an argument, then calls on the server
     * to log in an existing user.
     * @param loginRequestPayload Holds the user's credentials: username and password.
     * @returns The Post request.
     */
    login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
        const loginUrl = `${this.baseUrl}/login`;

        return this.http.post<LoginResponse>(loginUrl, loginRequestPayload)
                        .pipe(map(data => {
                            localStorage.setItem('username', loginRequestPayload.username);
                            localStorage.setItem('accessToken', data.accessToken);
                            this.loggedInStatus = true;
                            return true;
                        }));
    }

    /**
     * Logs out a user.
     * @returns 
     */
    logout() {
        const logoutUrl = `http://localhost:9090/api/v1/auth/logout`;

        localStorage.clear();
        this.loggedInStatus = false;

        return this.http.get(logoutUrl, {responseType : 'json'});
    }

    /**
     * 
     * @returns The logged in status, true or false;
     */
    getLoggedInStatus() {
        if(this.getUsername() != null) {
            this.loggedInStatus = true;
        } else {
            this.loggedInStatus = false;
        }
        return this.loggedInStatus;
    }
 
    /**
     * Gets the logged in user's username.
     * @returns The username.
     */
    getUsername() { 
        return localStorage.getItem('username');
    }


    /**
     * Takes a favorite product payload as an argument, then calls on 
     * the server to save a product to the user's favorite products list.
     * @param favoriteProductPayload Holds the username and the product number.
     * @returns The Post request.
     */
    favoriteProduct(favoriteProductPayload: FavoriteProductPayload): Observable<FavoriteProductPayload> {
        const favoriteProductUrl = `${this.baseUrl}/favoriteProduct`;
        return this.http.post<FavoriteProductPayload>(favoriteProductUrl, favoriteProductPayload, { responseType : 'text'});
    }

    /**
     * Takes a favorite product payload as an argument, then calls on 
     * the server to delete a product from the user's favorite products list.
     * @param favoriteProductPayload Holds the username and the product number. 
     * @returns The Delete request.
     */
    deleteFavProduct(favoriteProductPayload: FavoriteProductPayload) {
        const favoriteProductUrl = `${this.baseUrl}/favoriteProduct`;
        
        return this.http.delete(favoriteProductUrl,  { params : 
            {
                productProdNum: favoriteProductPayload.productProdNum,
                username: favoriteProductPayload.username
            }
        });
    }

    getPrincipal() {
        const authUrl = `${this.baseUrl}/user`;
        this.http.get(authUrl).subscribe();
    }
}