import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productsUrl = "http://localhost:9090/api/v1/products";

    constructor(private http: HttpClient) { }

    /**
    * Calls on the server to Returns a list of all products.
    * @returns The list of all products.
    */
    getAllProducts(): Observable<Array<Product>> {
        const searchUrl = `${this.productsUrl}/search`;
        return this.http.get<Array<Product>>(searchUrl);
    }

    /**
     * Takes a product number as an argument then calls on the server to 
     * return that single product object from the entire database of products.
     * @param prodNum The product number.
     * @returns The product object.
     */
    getProduct(prodNum: number): Observable<Product> {
        const productDetailsUrl = `${this.productsUrl}/${prodNum}`;
        return this.http.get<Product>(productDetailsUrl);
    }

    /**
     * Takes a category's id as an argument then calls on the server to 
     * return a list of products within that category id.
     * @param theCategoryId The category id.
     * @param currentPage 
     * @param pageSize 
     * @returns A list of all products in the selected category.
     */
    getProductsByCategory(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseProducts> {
        const searchUrl = `${this.productsUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseProducts>(searchUrl);
    }

    /**
     * Takes a keyword as an argument then calls on the server to return a 
     * list of products whose name contains that keyword.
     * @param keyword The keyword, such as a product's name.
     * @param currentPage 
     * @param pageSize 
     * @returns A list of all products whose name contains the keyword.
     */
    getProductsByName(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseProducts> {
        const searchUrl = `${this.productsUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseProducts>(searchUrl);
    }

    /**
     * Takes a product's ingredient as an argument then calls on the server to 
     * return a list of products containing that ingredient.
     * @param ingredient Any ingredient.
     * @param currentPage 
     * @param pageSize 
     * @returns A list of products containing that ingredient.
     */
    getProductsByIngredient(ingredient: string, currentPage: number, pageSize: number): Observable<GetResponseProducts> {
        const searchUrl = `${this.productsUrl}/search/searchByIngredients?ingredient=${ingredient}&page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseProducts>(searchUrl);
    }

    /**
     * Calls on the server to returns a list of a user's favorite products.
     * @param username The user's username.
     * @returns A list of the user's favorite products.
     */
    getFavoriteProducts(username: string): Observable<GetResponseFavProducts> {
        return this.http.get<GetResponseFavProducts>(`${this.productsUrl}/search/favoriteProducts?username=${username}`);
    }
}

// For the products list.
interface GetResponseProducts {
    _embedded: {
        products: Product[];
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    }
}

// Specifically for the Favorite Products list where pagination is not used (yet)
interface GetResponseFavProducts {
    _embedded: {
        products: Product[];
    }
}