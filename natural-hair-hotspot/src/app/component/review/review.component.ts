import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../service/product.service';
import { ReviewService } from '../../service/review.service';
import { CreateReviewPayLoad } from '../../common/create-review.payload';
import { Review } from 'src/app/common/review';
import { FormGroup, FormControl } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit{

    product: Product = new Product();
    review: Review = new Review();
    reviewPayLoad: CreateReviewPayLoad;
    createReviewForm: FormGroup;
    products: Product[] = [];
    reviews: Review[] = [];


       // Properties for server-side paging
       currentPage: number = 1;
       pageSize: number = 20;
       totalRecords: number = 0;

    constructor(private _activatedRoute: ActivatedRoute,
                private _productService: ProductService,
                private _reviewService: ReviewService,
                private _router: Router) {
                    this.review = {
                      //  id: 0,
                        title: '',
                        body: '',
                  //      prodNum: 0,
                        product: ''
                    }
                }

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

        this._productService.getAllProducts().subscribe((data) => {
            this.products = data;
            console.log('data', data);
            console.log('products', this.products);
        });

    }

    getProductInfo(){
        const prodNum: number = +this._activatedRoute.snapshot.paramMap.get('prodNum');

        this._productService.get(prodNum).subscribe(
            data => {
                this.product = data;
            }
        );
    }

    searchProducts(keyword: string){
        console.log('keyword', keyword);
        this._router.navigateByUrl('/search/'+keyword);
    }

    createReview() {
        const prodNum: number = +this._activatedRoute.snapshot.paramMap.get('prodNum');

        this.review.title = this.createReviewForm.get('title').value;
        this.review.body = this.createReviewForm.get('body').value;
        this.review.product = 'product/'+prodNum;

        this._reviewService.saveReview(this.review)
                                    .subscribe(this.processResults());
            

        console.log('title', this.review.title);
        console.log('body', this.review.body);
        console.log('prodNum', prodNum);
        console.log('new review', this.review);
    }

    processResults(){
        return data => {
            this.review.title = data.review.title;
            this.review.body = data.review.body;
            this.review.product = data.review.product;
        }
    }

}