import {Component, OnInit} from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/common/review';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit{

    product: Product = new Product();
    currentProdNum: number = 1;
    reviews: Review[] = [];

    // Properties for server-side paging
    currentPage: number = 1;
    pageSize: number = 5;
    totalRecords: number = 0;

    constructor(private _activatedRoute: ActivatedRoute,
                private _productService: ProductService,
                private _router: Router) {}

    // The values returned by the methods called here are stored and usable on this component's html page.            
    ngOnInit() {
        this._activatedRoute.paramMap.subscribe(() => {
                this.getProductInfo();
            })
    }

    // Selects a single product and a list of reviews of that product
    getProductInfo(){
        const prodNum: number = +this._activatedRoute.snapshot.paramMap.get('prodNum');

        // Selects the single product
        this._productService.get(prodNum).subscribe(
            data => {
                this.product = data;
            }
        );
        
        // Selects a list of reviews for the product number that is passed 
        this._productService.getReviewsByProductNumber(prodNum, 
                                                this.currentPage - 1, 
                                                this.pageSize)
                                                .subscribe(this.processResults());
        
    }


    // Assigns values to reviews list and page fields that from data received from GET request
    processResults(){
        return data => {
            this.reviews = data._embedded.reviews;
            this.currentPage = data.page.number + 1;
            this.totalRecords = data.page.totalElements;
            this.pageSize = data.page.size;
        }
    }


    // Takes the input from the search bar then searches by the keyword input
    searchProducts(keyword: string){
        console.log('keyword', keyword);
        this._router.navigateByUrl('/search/'+keyword);
    }
}