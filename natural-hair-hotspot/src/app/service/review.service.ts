import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../common/review';
import { CreateReviewPayLoad } from '../common/create-review.payload';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    private baseUrl = "http://localhost:9090/api/v1/products";
    private reviewsUrl = "http://localhost:9090/api/v1/reviews";

    constructor(private http: HttpClient) {}

    getAllReviews(currentPage: number, pageSize: number): Observable<GetResponseReviews>{
        const searchUrl = `${this.reviewsUrl}/search/page=${currentPage}&size=${pageSize}`;
        return this.http.get<GetResponseReviews>(searchUrl);
    }


    saveReview(review: Review): Observable<Review> {
        const saveUrl = `${this.reviewsUrl}`;
        return this.http.post<Review>(saveUrl, review);
    }


    getReview(id: number): Observable<Review>{
        const searchUrl = `${this.reviewsUrl}/` + id;
        return this.http.get<Review>(searchUrl);

    }
    

    // Takes a product number as an argument and returns a list of reviews for that product
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
