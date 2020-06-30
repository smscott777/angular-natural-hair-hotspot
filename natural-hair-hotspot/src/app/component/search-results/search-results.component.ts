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
    currentCategoryId: number = 1;
    previousCategoryId: number = 1;
    searchMode: boolean = false;

    //properties for server-side paging
    currentPage: number = 1;
    pageSize: number = 5;
    totalRecords: number = 0;

    constructor(private _activatedRoute: ActivatedRoute,
                private _productService: ProductService
                ) {}


    // This should assign a value to products according to the parameter(which should be the search results)
    ngOnInit() {
        this._activatedRoute.paramMap.subscribe(()=>{
            this.listProducts();
        })
    }

    listProducts(){
        this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

        if(this.searchMode){
            this.handleSearchProducts();
        }
        else{
            this.handleListProducts();
        }
    }

    handleListProducts(){
        const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

        if(hasCategoryId){
            this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
        }
        else{
            this.currentCategoryId = 1
        }
    }

    handleSearchProducts(){
        const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

        this._productService.searchProducts(keyword,
                                            this.currentPage,
                                            this.pageSize)
                                            .subscribe(this.processResults());
    }

    processResults(){
        return data => {
            this.products = data._embedded.products;
            this.currentPage = data.page.number + 1;
            this.totalRecords = data.page.totalElements;
            this.pageSize = data.page.size;
        }
    }
}