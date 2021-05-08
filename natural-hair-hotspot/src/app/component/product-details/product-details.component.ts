import {Component, OnInit} from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/common/review';
import { ReviewService } from 'src/app/service/review.service';
import { UserService } from 'src/app/service/user.service';
import { FavoriteProductPayload } from '../../common/favorite-product.payload';

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

    constructor(private _activatedRoute: ActivatedRoute,
                private _productService: ProductService,
                private _userService: UserService,
                private _reviewService: ReviewService,
                private _router: Router) {}

    // The values returned by the methods called here are stored and usable on this component's html page.            
    ngOnInit() {
        this._activatedRoute.paramMap.subscribe(() => {
            this.getProductInfo();
        });

        console.log('test getUsername: ', this._userService.getUsername());
    }

    // Selects a single product and a list of reviews of that product
    getProductInfo(){
        // Selects the single product
        this._productService.getProduct(this.prodNum).subscribe(data => {
            this.product = data;
        });
        
        // Selects a list of reviews for the product number that is passed 
        this._reviewService.getReviewsByProductNumber(
            this.prodNum, 
            this.currentPage - 1, 
            this.pageSize
        )
        .subscribe(this.processResults());    
    }

    // Assigns values to reviews list and page fields that from data received from GET request
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
        console.log('keyword', keyword);
        this._router.navigateByUrl('/search/'+keyword);
    }

    // Saves a product under a specific user's 'Favorite Products' list
    favProduct() {
        this.favoriteProductPayload.productProdNum = this.prodNum;
        this.favoriteProductPayload.username = this._userService.getUsername();

        if(this.favoriteProductPayload.username != null) {
            this.isLoggedIn = true;
            this._userService.favoriteProduct(this.favoriteProductPayload)
                                .subscribe(data => {       
                                    console.log('Response:', data)
                                }); 
        }
        else{
            this.isLoggedIn = false;
            this.loginMessage = "Login to save.";
        }
    }
}