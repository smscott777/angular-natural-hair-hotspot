import {Component, OnInit} from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/common/review';
import { ReviewService } from 'src/app/service/review.service';
import { UserService } from 'src/app/service/user.service';
import { FavoriteProductPayload } from '../../common/favorite-product.payload';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit{

    prodNum: number = +this._activatedRoute.snapshot.paramMap.get('prodNum');
    product: Product = new Product();
    reviews: Review[] = [];
    favoriteProductPayload: FavoriteProductPayload = new FavoriteProductPayload(); 

    // Properties for server-side paging
    currentPage: number = 1;
    pageSize: number = 20; // The # of reviews that will appear per page
    totalRecords: number = 0;

    isLoggedIn: any;
    loginMessage: string = "";
    response: any;  // The response message from the server when favoriting a product


    constructor(private _activatedRoute: ActivatedRoute,
                private _productService: ProductService,
                private _userService: UserService,
                private _reviewService: ReviewService,
                private _router: Router) {}

    /**
     * On page load, gets all of the data for the one product selected.
     * This will populate the product's image, ingredients, reviews, name, etc.
     */            
    ngOnInit() {
        this._activatedRoute.paramMap.subscribe(() => {
            this.getProductInfo();
        });
    }

    // Selects a single product and gets a list of reviews of that product.
    getProductInfo() {
        // Gets the product.
        this._productService.getProduct(this.prodNum).subscribe(data => {
            this.product = data;
        });
        
        // Gets a list of all reviews for the one product. 
        this._reviewService.getReviewsByProductNumber(
            this.prodNum, 
            this.currentPage - 1, 
            this.pageSize
        ).subscribe(this.processResults());    
    }

    // Assigns values to this component's reviews list using data received from server.
    processResults() {
        return data => {
            this.reviews = data._embedded.reviews;
            this.currentPage = data.page.number + 1;
            this.totalRecords = data.page.totalElements;
            this.pageSize = data.page.size;
        }
    }

    // Takes the input from the search bar then searches by the keyword input
    searchProducts(keyword: string) {
        this._router.navigateByUrl('/search/'+keyword);
    }

    /** 
     * Saves a product under the logged in user's favorite products list.
     * If no user is logged in, prompts the user to log in.
     */ 
    favProduct() {
        this.favoriteProductPayload.productProdNum = this.prodNum;
        this.favoriteProductPayload.username = this._userService.getUsername();

        if(this.favoriteProductPayload.username != null) {
            this.isLoggedIn = true;

            this._userService.favoriteProduct(this.favoriteProductPayload)
                                .subscribe(data => {       
                                    this.response = data;
                                }, (error: HttpErrorResponse) => {
                                        this.response = error.error;
                                    }
                                ); 
        }
        else {
            this.isLoggedIn = false;
            this.loginMessage = "Login to save.";
        }
    }
}