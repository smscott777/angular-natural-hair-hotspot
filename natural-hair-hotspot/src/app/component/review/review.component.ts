import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../service/product.service';
import { ReviewService } from '../../service/review.service';
import { Review } from 'src/app/common/review';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit{

    product: Product = new Product();
    review: Review = new Review();
    createReviewForm: FormGroup;
    reviews: Review[] = [];
    response: string = "";

    constructor(private _activatedRoute: ActivatedRoute,
                private _productService: ProductService,
                private _reviewService: ReviewService,
                private _router: Router) {
                    this.review = {
                        title: '',
                        body: '',
                        product: '',
                    }
                }

    /**
     * On page load, populates the selected product's name and image,
     * and creates a review form. 
     */
    ngOnInit() {
        this._activatedRoute.paramMap.subscribe(
            () => {
                this.getProductInfo();
            }
        );

        this.createReviewForm = new FormGroup({
            title: new FormControl(''),
            body: new FormControl(''),
        });
    }

    /**
     * Stores the product's data from the product detail page.
     */
    getProductInfo(){
        const prodNum: number = +this._activatedRoute.snapshot.paramMap.get('prodNum');

        this._productService.getProduct(prodNum).subscribe(
            data => {
                this.product = data;
            }
        );
    }

    /**
     * Stores the keyword input by the user in the search bar, then navigates to
     * the search URL with that keyword as an endpoint.
     * @param keyword The name or ingredient entered into the search bar by the user.
     */
    searchProducts(keyword: string){
        this._router.navigateByUrl('/search/'+keyword);
    }

    /**
     * Takes the review title and body input by the user from the review form and posts a new review.
     * Ensures that the review is not empty.
     */
    createReview() {
        const prodNum: number = +this._activatedRoute.snapshot.paramMap.get('prodNum');

        this.review.title = this.createReviewForm.get('title').value;
        this.review.body = this.createReviewForm.get('body').value;

        if(this.review.title.length == 0 || this.review.body.length == 0) { //  Will not post an empty review.
            this.response = "Field can not be blank."
        }
        else if(this.review.title.startsWith(" ") || this.review.body.startsWith(" ")) {    // To avoid posting whitespace reviews.
            this.response = "Field can not be blank."
        }
        else {
            this.review.product = 'product/'+prodNum;

            this._reviewService.saveReview(this.review).subscribe(); 
            this.response = "Review posted."
            // Empties the input text boxes.
            this.createReviewForm.setValue({
                title: '',
                body: ''
            });
        }               
    }
}