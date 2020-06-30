import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../common/product';
import { Category } from '../common/category';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = "http://localhost:9090/api/v1/products";
    private categoryUrl = "http://localhost:9090/api/v1/category";

    constructor(private http: HttpClient) {}

    // ` works but ' doesn't
    getProducts(theCategoryId: number): Observable<Product[]>{
        const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
        return this.getProductsList(searchUrl);
    }

    getProductsPaginate(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseProducts>{
        const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseProducts>(searchUrl);
    }

    getProductCategories(): Observable<Category[]>{
        return this.http.get<GetResponseCategory>(this.categoryUrl).pipe(
                    map(response => response._embedded.category)
        );
    }

    searchProducts(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseProducts>{
        const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseProducts>(searchUrl);
    }

    private getProductsList(searchUrl: string): Observable<Product[]>{
        return this.http.get<GetResponseProducts>(searchUrl).pipe(
                    map(response => response._embedded.products)
        );
    }

    get(productNum: number): Observable<Product>{
        const productDetailsUrl = `${this.baseUrl}/${productNum}`;
        return this.http.get<Product>(productDetailsUrl);
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

interface GetResponseCategory{
    _embedded: {
        category: Category[];
    }
}