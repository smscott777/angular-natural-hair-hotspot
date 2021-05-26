import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../component/login/login-request.payload';
import { LoginResponse } from '../component/login/login-response.payload';
import { map } from 'rxjs/operators';
import { FavoriteProductPayload } from '../common/favorite-product.payload';
import { User } from '../common/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

   private baseUrl = "http://localhost:9090/api/v1/auth";
   private loggedInStatus: boolean;

    @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
    @Output() username: EventEmitter<string> = new EventEmitter();

    constructor(private http: HttpClient,
                private localStorage: LocalStorageService) {}

    /**
     * 
     * @param user 
     * @returns 
     */
    registerUser(user: User): Observable<User>{
        const registerUrl = `${this.baseUrl}/signup`;
        return this.http.post<User>(registerUrl, user, { responseType : 'text'});
    }

    /**
     * 
     * @param loginRequestPayload 
     * @returns 
     */
    login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
        const loginUrl = `${this.baseUrl}/login`;

        return this.http.post<LoginResponse>(loginUrl, loginRequestPayload)
                        .pipe(map(data => {
                            this.localStorage.store('username', data.username);

                            this.loggedInStatus = true;

                            this.loggedIn.emit(true);
                            this.username.emit(data.username);
                            return true;
                        }));
    }

    /**
     * 
     * @returns 
     */
    logout() {
        const logoutUrl = `http://localhost:9090/api/v1/logout`;

        this.localStorage.clear('username');
        this.localStorage.clear;
        this.loggedIn.emit(false);
        //return false;
        this.loggedInStatus = false;

        return this.http.get(logoutUrl, {responseType : 'json'});
    }

    /**
     * 
     * @returns 
     */
    getLoggedInStatus() {
        return this.loggedInStatus;
    }
 
    /**
     * 
     * @returns 
     */
    getUsername() { 
        return this.localStorage.retrieve('username');
    }

    /**
     * 
     * @returns 
     */
    getLocalStorage() {
        return this.localStorage;
    }

    /**
     * 
     * @param favoriteProductPayload 
     * @returns 
     */
    favoriteProduct(favoriteProductPayload: FavoriteProductPayload): Observable<FavoriteProductPayload> {
        const favoriteProductUrl = `${this.baseUrl}/favoriteProduct`;
        return this.http.post<FavoriteProductPayload>(favoriteProductUrl, favoriteProductPayload, { responseType : 'text'});
    }

    /**
     * 
     * @param favoriteProductPayload 
     * @returns 
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
}