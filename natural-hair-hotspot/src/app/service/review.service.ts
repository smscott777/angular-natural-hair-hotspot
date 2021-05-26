import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../common/review';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    private reviewsUrl = "http://localhost:9090/api/v1/reviews";

    constructor(private http: HttpClient) {}

    /**
     * Calls on the server to return a list of all reviews.
     * @param currentPage 
     * @param pageSize 
     * @returns The list of all reviews.
     */
    getAllReviews(currentPage: number, pageSize: number): Observable<GetResponseReviews>{
        const searchUrl = `${this.reviewsUrl}/search/page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseReviews>(searchUrl);
    }

    /**
     * Calls on the server to return a review.
     * @param id The review's id.
     * @returns The review.
     */
    getReview(id: number): Observable<Review>{
        const searchUrl = `${this.reviewsUrl}/` + id;
        return this.http.get<Review>(searchUrl);
    }

    /**
     * Calls on the server and saves a review.
     * @param review The new review to be saved.
     * @returns The post request.
     */
    saveReview(review: Review): Observable<Review> {
        const saveUrl = `${this.reviewsUrl}`;
        return this.http.post<Review>(saveUrl, review);
    }
    
   /**
    * Calls on the server and finds all reviews of a single product.
    * @param prodNum The product number.
    * @param currentPage 
    * @param pageSize 
    * @returns A list of all reviews for the selected product.
    */
    getReviewsByProductNumber(prodNum: number, currentPage: number, pageSize: number): Observable<GetResponseReviews>{
        const searchUrl = `${this.reviewsUrl}/search/prodNum?prodNum=${prodNum}&page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseReviews>(searchUrl);
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
