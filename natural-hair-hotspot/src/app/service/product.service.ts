import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { Review } from '../common/review';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productsUrl = "http://localhost:9090/api/v1/products";

    constructor(private http: HttpClient) {}
    
    // Takes a category's id as an argument and returns a list of products within that category id 
    getProductsByCategory(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseProducts>{
        const searchUrl = `${this.productsUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseProducts>(searchUrl);
    }

    // Takes a product's name as an argument and returns a list of products containing that name
    getProductsByName(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseProducts>{
        const searchUrl = `${this.productsUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseProducts>(searchUrl);
    }

    // Takes a product's ingredient as an argument and returns a list of products containing that ingredient
    getProductsByIngredient(ingredient: string, currentPage: number, pageSize: number): Observable<GetResponseProducts>{
        const searchUrl = `${this.productsUrl}/search/searchByIngredients?ingredient=${ingredient}&page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseProducts>(searchUrl);
    }    

    // Takes a product number as an argument and returns that single product from the entire database of products
    get(productNum: number): Observable<Product>{
        const productDetailsUrl = `${this.productsUrl}/${productNum}`;
        return this.http.get<Product>(productDetailsUrl);
    }

    getAllProducts(): Observable<Array<Product>> {
        const searchUrl = `${this.productsUrl}/search`;
        return this.http.get<Array<Product>>(searchUrl);
    }

}

interface GetResponseProducts{
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

interface GetResponseReviews{
    _embedded: {
        reviews: Review[];
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    }
}