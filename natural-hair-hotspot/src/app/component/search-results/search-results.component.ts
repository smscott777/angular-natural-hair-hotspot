import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit{

    products: Product[] = [];
    searchByNameMode: boolean = false;
    searchByCategoryMode: boolean = false;

    // Properties for server-side paging
    currentPage: number = 1;
    pageSize: number;   // Max number of products to be listed as search results. Infinite if not inititialized.
    totalRecords: number = 0;

    constructor(private _activatedRoute: ActivatedRoute,
                private _productService: ProductService
                ) {}


    // The values returned by the methods called here are stored and usable on this component's html page.            
    ngOnInit() {
        this._activatedRoute.paramMap.subscribe(()=>{
            this.listProducts();  
        })
    }


    // Does a search of the products by either the product's name (containing) or the category
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


    // This method takes the stored input keyword from the console then searches products by this keyword
    handleSearchProducts(){
        const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

        this._productService.getProductsByName(keyword,
                                            this.currentPage - 1,
                                            this.pageSize)
                                            .subscribe(this.processResults());

        // If the keyword is not in the product's name, it will search in the ingredients list
        if(this.products.length == 0){
            this._productService.getProductsByIngredient(keyword,
                this.currentPage - 1,
                this.pageSize)
                .subscribe(this.processResults());
        }

    }


    // When a category button is clicked from the nav sidebar, this method takes the stored category id.
    // Then searches products by this category id
    handleSearchByCategory(){
        const id: number = +this._activatedRoute.snapshot.paramMap.get('id');  // parses id from string to number
        
        this._productService.getProductsByCategory(id,
                                                this.currentPage - 1,
                                                this.pageSize)
                                                .subscribe(this.processResults());
    }


    // Assigns values to reviews list and page fields that from data received from GET request
    processResults(){
        return data => {
            this.products = data._embedded.products;
            this.currentPage = data.page.number + 1;
            this.totalRecords = data.page.totalElements;
            this.pageSize = data.page.size;
        }
    }
}