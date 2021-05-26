import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteProductPayload } from 'src/app/common/favorite-product.payload';
import { UserService } from 'src/app/service/user.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit{

    products: Product[] = [];
    searchByNameMode: boolean = false;
    searchByCategoryMode: boolean = false;
    searchCounter: number = 0;
    favoriteProductPayload: FavoriteProductPayload = new FavoriteProductPayload(); 
    isLoggedIn: boolean;
    response: any;  // The response message from the server when favoriting a product

    // Properties for server-side paging
    currentPage: number = 1;
    pageSize: number = 100;   // Max number of products to be listed as search results. 
    totalRecords: number = 0;

    constructor(private _activatedRoute: ActivatedRoute,
                private _productService: ProductService,
                private _router: Router,
                private _userService: UserService
                ) {}

    /**
     * Performs a product search on page load.
     * The values returned by the methods called here are stored and usable on this component's html page.
     */            
    ngOnInit() {
        this.loggedIn();

        this._activatedRoute.paramMap.subscribe(()=>{
            this.listProducts();
        })
    }

    // Does a search of the products by either the product's name (containing) or the category.
    listProducts(){
        this.searchByNameMode = this._activatedRoute.snapshot.paramMap.has('keyword');

        this.searchByCategoryMode = this._activatedRoute.snapshot.paramMap.has('id');

        if(this.searchByNameMode){
            this.handleSearchProducts();
        }
        else if (this.searchByCategoryMode) {
            this.handleSearchByCategory();
        } 
    }

    // Stores the keyword from the URL, then searches product names by this keyword.
    handleSearchProducts(){
        const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

        this._productService.getProductsByName(keyword,
                                            this.currentPage - 1,
                                            this.pageSize)
                                            .subscribe(this.processResults());  
    }
    /**
     * When a category button is clicked from the nav sidebar, this method stores the category id from the URL.
     * Then searches products by this category id.
     */
    handleSearchByCategory(){
        const id: number = +this._activatedRoute.snapshot.paramMap.get('id');  // parses id from string to number
        
        this._productService.getProductsByCategory(id,
                                                this.currentPage - 1,
                                                this.pageSize)
                                                .subscribe(this.processResults());
    }

    /**
     * Assigns values to the products list from the json data.
     * If there are no prouct names matching the keyword, it will
     * then search by ingredients.
     */ 
    processResults(){
        return data => {
            const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

            this.products = data._embedded.products;
            this.currentPage = data.page.number + 1;
            this.totalRecords = data.page.totalElements;
            this.pageSize = data.page.size;
            
            if(this.products.length == 0) {     // If the keyword is not in the product's name, it will search in the ingredients list
                this.searchCounter++;

                if(this.searchCounter > 1) { // Prevents infinite searching if no product exists with given keyword
                    return;
                }

                this._productService.getProductsByIngredient(keyword,
                    this.currentPage - 1,
                    this.pageSize)
                    .subscribe(this.processResults());
            } 
            else {
                // Do nothing.
            } 
        }
    }

    /**
     * Stores the keyword input by the user in the search bar, then navigates to
     * the search URL with that keyword as an endpoint.
     * @param keyword The name or ingredient entered into the search bar by the user.
     */
    searchProducts(keyword: string){
        this.searchCounter = 0;
        this._router.navigateByUrl('/search/'+keyword);
    }

    // Saves a product under a specific user's 'Favorite Products' list
    favProduct(prodNum) {
        this.favoriteProductPayload.productProdNum = prodNum;
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
        }
    }

    /**
     * Checks whether a user is logged in or not.
     * Sets isLoggedIn to true if so or false if not.
     */
    loggedIn() {
        if(this._userService.getUsername() == null) {
            this.isLoggedIn = false;
        }
        else {
            this.isLoggedIn = true;
        }
    }
}